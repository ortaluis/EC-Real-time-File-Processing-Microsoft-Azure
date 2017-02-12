# EC-Real-time-File-Processing-Microsoft-Azure
The Real-time File Processing Serverless Reference Architecture is a general-purpose, eventdriven,
parallel data processing architecture. It is designed for workloads that need more than one
data derivative of an object. It demonstrates a simple markdown conversion application where Lambda
functions are used to convert markdown files to HTML and plain text.

Regarding the described decisions, the following architectural design is developed.

1. Input files are stored in Azure Blob Storage.

2. Azure Functions are managing the connectivity between the Azure Blob Storage Container and the Azure Event Hub. Additionally they create an output storage container at an early stage.

3. Azure Event Hub uses a many-to-many communication approach capable of managing connections to other devices or Azure services and processing messages with a high throughput.

4. Azure Function - HTML Processing: The function is triggered by the event hub, downloads a markdown file from the input Azure Blob Storage container, transforms it into an HTML file and stores it in the output Azure Blob Storage container.

5. Azure Function - Plain Text Processing: It is similar to the HTML Processing function but transforms a markdown file into a plain text file.

6. Azure Function - Other File Processing: It is possible to add other functions which implement additional functionality and act similar to the above mentioned processing functions.

7. Processed files are stored in Azure Blob Storage or maybe in another storage (such as a Azure Table Storage).

**The Azure Functions’ Code**: For each implemented Azure Function (two storage handling functions Input1Handler and Input2Handler and two file processing functions ProcessToHtml and ProcessToPlainText), a folder is provided. The folder contains the referring index.js and function.json files.

**Azure Storage Account Access**: To access an Azure Storage Account, the storage account’s name and the referring access key(s) have to be used. The referring access information for the input and output storages of the authors’ implementation can be found in the StorageAccessKeys.txt file.

Demo: https://youtu.be/MtMvkEMBzdM?t=2m34s

Documentation: This documentation can be found as [Documentation.pdf](../Documentation.pdf) file.