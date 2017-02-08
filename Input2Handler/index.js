var azureStorage = require('azure-storage');

module.exports = function (context, inputblob) {
    context.log("JavaScript blob trigger function processed blob \n Name: ", context.bindingData.blobname, "\n Blob Data Type: ", context.bindingData.blobextension, "Blob Size: ", inputblob.length, "Bytes");

    var blobData = {
        sourceStorageAccount: 'input2',
        sourceKey: 'MuT+bWH5iQll0Ei8k+DL09m9Q31M43H2DKpQFKKPdk+O4ztcW8PvpP2s0qTiiD+DtGO/i80uBorGMV1QkC0OhQ==',
        sourceContainer:'input',
        blobName: context.bindingData.blobname,
        blobExtension: context.bindingData.blobextension,
        destinationStorageAccount: 'outputstorage2', 
        destinationKey: '3FNEOfjLAsZyOC4k77Mz1X7BHRRg9bZz4SxYgJu4WSNhX+uxpo2Y+IGw7uVdoWdWFC9rKJyR0k8Bwv4ew6jOQQ==',
        destinationContainer: context.bindingData.blobname.toLowerCase()
    };

   var blobService = azureStorage.createBlobService(blobData.destinationStorageAccount, blobData.destinationKey);
   context.log('Create new container', blobData.destinationContainer, 'if it does not exist')
   blobService.createContainerIfNotExists(blobData.destinationContainer, {publicAccessLevel : 'container'}, function(err, result, response) {
        if (err) {
            context.log("Could not create container", containerName, '\nError:', err);
            next("Could not create container " + containerName + '\nError: ' + err);
        }else{
            context.log('Result: ', result);
            context.log('Response: ', response);
                }
            });

    var message = JSON.stringify(blobData);
    context.log('Created message:\n', message);
    context.bindings.outputEventHubMessage = message;

    context.done();
};