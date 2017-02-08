var azureStorage = require('azure-storage');
var marked = require('marked');
var asyn = require('async');

module.exports = function (context, inputEventHubTrigger) {
    
    context.log('JavaScript eventhub trigger function processes work item', inputEventHubTrigger);
    

    asyn.waterfall([
        
        function downloadBlob(next){
            context.log('Create blob service to storage account', inputEventHubTrigger.sourceStorageAccount);
            var blobServiceIn = azureStorage.createBlobService(inputEventHubTrigger.sourceStorageAccount, inputEventHubTrigger.sourceKey);
            var blobName = inputEventHubTrigger.blobName + '.' + inputEventHubTrigger.blobExtension;
            context.log('Download blob', blobName, 'from', inputEventHubTrigger.sourceContainer);
            blobServiceIn.getBlobToText(inputEventHubTrigger.sourceContainer, blobName, function(err, blobContent, blob){
                if(!err){
                    context.log("Sucessfully downloaded blob ", blobName);
                    next(null, blobContent);
                }else{
                    context.log("Could not download blob", blobName, "\nError:", err);
                    next("Could not download blob");
                }
            });
        },
        
        function processContent(blobContent, next){

            context.log('Processing blob');
            var processedContent = marked(blobContent);
            context.log('Processed Content:\n', processedContent);
            next(null, processedContent);
        },

        function uploadBlob(processedContent, next){
            context.log('Create blob service to storage account', inputEventHubTrigger.destinationStorageAccount);
            var blobServiceOut = azureStorage.createBlobService(inputEventHubTrigger.destinationStorageAccount, 
                                                                inputEventHubTrigger.destinationKey);     
            var newBlobName = inputEventHubTrigger.blobName + '.' + 'html';
            context.log('Uploading new blob', newBlobName, 'to container', inputEventHubTrigger.destinationContainer)
            blobServiceOut.createBlockBlobFromText(inputEventHubTrigger.destinationContainer,
                                                   newBlobName, 
                                                   processedContent, 
                                                   function(err, result, response){
                                                        if(err){
                                                            context.log("Blob could not be created:", err);
                                                            next("Blob could not be created:" + err);
                                                        } else {
                                                            context.log('Blob is uploaded successfully.');
                                                            next(null);
                                                        }
                                                    });
        }
    ], function(err){
        if(err){
            context.log('Waterfall execution error:', err);
        }else{
            context.log('Waterfall execution succeeded.');
        }
    });
    context.done();
};