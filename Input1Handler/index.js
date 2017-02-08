var azureStorage = require('azure-storage');

module.exports = function (context, inputblob) {
    context.log("JavaScript blob trigger function processed blob \n Name: ", context.bindingData.blobname, "\n Blob Data Type: ", context.bindingData.blobextension, "Blob Size: ", inputblob.length, "Bytes");

    var blobData = {
        sourceStorageAccount: 'input1',
        sourceKey: 'Hjpszakshr4Ri2TLjoJo52YxziE9VbW/DeQmtegsfOcCk1PW5QsQzBG2dZ2/1AWTO+quYqzSnTtHaK5pQH25BQ==',
        sourceContainer:'input',
        blobName: context.bindingData.blobname,
        blobExtension: context.bindingData.blobextension,
        destinationStorageAccount: 'outputstorage1', 
        destinationKey: '6/jWN1tfJt7e5Cn5YSsAP+dC334wpoHxBc+L4JLC3M61zcMxcgjAOoySnQ95hHWNbJic67GJEUv4uS+G5Q5QGg==',
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