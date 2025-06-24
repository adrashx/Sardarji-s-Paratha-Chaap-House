<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Viewer</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .pdf-container {
            width: 100%;
            height: 80vh;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: auto;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background-color: white;
        }
        
        .download-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        
        .download-link:hover {
            background-color: #0056b3;
        }
        
        .loading {
            text-align: center;
            padding: 50px;
            font-size: 18px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PDF Document Viewer</h1>
            <p>View and download the document below</p>
        </div>
        
        <div class="pdf-container" id="pdfContainer">
            <div class="loading">Loading PDF...</div>
        </div>
        
        <a href="download.pdf" class="download-link" download>
            📥 Download PDF
        </a>
    </div>

    <script>
        // Set up PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        // Load and display the PDF
        const loadingTask = pdfjsLib.getDocument('download.pdf');
        
        loadingTask.promise.then(function(pdf) {
            const container = document.getElementById('pdfContainer');
            container.innerHTML = '';
            
            // Render all pages
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                pdf.getPage(pageNum).then(function(page) {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const viewport = page.getViewport({scale: 1.5});
                    
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    
                    page.render(renderContext);
                    container.appendChild(canvas);
                });
            }
        }).catch(function(error) {
            document.getElementById('pdfContainer').innerHTML = 
                '<div class="loading">Error loading PDF. <a href="download.pdf" target="_blank">Click here to download</a></div>';
        });
    </script>
</body>
</html> 
