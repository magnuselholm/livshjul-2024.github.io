const svg = document.getElementById('lifeWheel');
let segments = [];
let numSegments = 0; // Track the number of segments chosen

function generateSegmentInputs() {
    numSegments = parseInt(document.getElementById('numSegments').value);
    if (numSegments > 0) {
        const segmentInputsDiv = document.getElementById('segmentInputs');
        segmentInputsDiv.innerHTML = ''; // Clear previous inputs

        for (let i = 0; i < numSegments; i++) {
            const segmentDiv = document.createElement('div');
            segmentDiv.classList.add('segment');
            
            const nameLabel = document.createElement('label');
            nameLabel.setAttribute('for', `segmentName${i}`);
            nameLabel.textContent = `Livsområde ${i + 1}: `;
            
            const nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('id', `segmentName${i}`);
            
            const valueLabel = document.createElement('label');
            valueLabel.setAttribute('for', `segmentValue${i}`);
            valueLabel.textContent = `  Point ${i + 1}: `;
            
            const valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'number');
            valueInput.setAttribute('id', `segmentValue${i}`);
            valueInput.setAttribute('min', '1');
            valueInput.setAttribute('max', '10');
            
            segmentDiv.appendChild(nameLabel);
            segmentDiv.appendChild(nameInput);
            segmentDiv.appendChild(valueLabel);
            segmentDiv.appendChild(valueInput);
            
            segmentInputsDiv.appendChild(segmentDiv);
        }

        drawSegmentLines(numSegments);
    }
}

function drawSegmentLines(numSegments) {
    // Clear existing lines and circles
    svg.innerHTML = `
        <circle cx="0" cy="0" r="1" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.1" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.2" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.3" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.4" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.5" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.6" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.7" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.8" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="0.9" fill="none" stroke="black" stroke-width="0.01"/>
        <circle cx="0" cy="0" r="1" fill="none" stroke="black" stroke-width="0.01"/>
    `;

    for (let i = 0; i < numSegments; i++) {
        const angle = (i / numSegments) * 2 * Math.PI;
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', '0');
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '0.01');
        svg.appendChild(line);
    }
}

function renderWheel() {
    segments = [];
    for (let i = 0; i < numSegments; i++) {
        const name = document.getElementById(`segmentName${i}`).value;
        const points = parseInt(document.getElementById(`segmentValue${i}`).value);
        if (name && points >= 0 && points <= 10) {
            segments.push({ name, points });
            console.log(name,points);
        }
    }
    if (segments.length > 0) {
        createSegmentTextFields(segments);
        drawWheel();
    }
}

function drawWheel() {
    // Clear existing segments but keep the lines
    drawSegmentLines(numSegments);

    const totalSegments = segments.length;
    if (totalSegments === 0) return;

    segments.forEach((segment, index) => {
        const startAngle = (index / totalSegments) * 2 * Math.PI;
        const endAngle = ((index + 1) / totalSegments) * 2 * Math.PI;
        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
        const x1 = Math.cos(startAngle);
        const y1 = Math.sin(startAngle);
        const x2 = Math.cos(endAngle);
        const y2 = Math.sin(endAngle);
        const segmentLength = segment.points / 10; // Calculate segment length based on points
        const pathData = `
            M 0 0 
            L ${x1 * segmentLength} ${y1 * segmentLength} 
            A ${segmentLength} ${segmentLength} 0 ${largeArcFlag} 1 ${x2 * segmentLength} ${y2 * segmentLength} 
            Z
        `;
        let color;
        switch (segment.name) {
            case "Karriere":
            case "Job":
            case "Arbejde":
                color = 'hsl(0, 100%, 80%)'; // Light red
                break;
            case "Familie":
            case "Forældre":
            case "Børn":
            case "Søn":
            case "Datter":
                color = 'hsl(60, 100%, 80%)'; // Light yellow
                break;
            case "Sundhed":
            case "Helbred":
            case "Træning":
            case "Form":
            case "Kost":
                color = 'hsl(120, 100%, 80%)'; // Light green
                break;
            case "Kærlighed":
            case "Kæreste":
            case "Partner":
            case "Parforhold":
            case "Kone":
            case "Mand":
                color = 'hsl(180, 100%, 80%)'; // Light cyan
                break;
            case "Venner":
            case "Sociale relationer":
            case "Netværk":
            case "Socialt liv":
            case "Fællesskab":
            case "Veninder":
                color = 'hsl(240, 100%, 80%)'; // Light blue
                break;
            case "Økonomi":
            case "Penge":
            case "Budget":
            case "Løn":
            case "Finanser":
            case "Indkomst":
                color = 'hsl(300, 100%, 80%)'; // Light purple
                break;
            case "Personlig udvikling":
            case "Mig selv":
            case "Mentalt helbred":
            case "Selvtillid":
            case "Selvværd":
                color = 'hsl(330, 100%, 80%)'; // Light pink
                break;
            case "Fritid":
            case "Hobby":
            case "Interesser":
                color = 'hsl(30, 100%, 80%)'; // Light orange
                break;
            default:
                color = `hsl(${index * (360 / totalSegments)}, 100%, 80%)`; // Adjust dynamically for additional segments
                break;
        }
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', color);
        path.setAttribute('fill-opacity', '0.75');
        path.setAttribute('stroke', 'black');
        path.setAttribute('stroke-width', '0.01');
        svg.appendChild(path);

        // Add text label
        const midAngle = (startAngle + endAngle) / 2;
        const textX = Math.cos(midAngle) * 1.25; // Slightly outside the outer circle
        const textY = Math.sin(midAngle) * 1.25; 
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('font-size', '0.1');
        text.setAttribute('fill', 'black');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('alignment-baseline', 'middle');
        text.textContent = segment.name;
        svg.appendChild(text);

        // Add points label
        const pointsLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        pointsLabel.setAttribute('x', textX);
        pointsLabel.setAttribute('y', textY + 0.1); // Adjusting label position
        pointsLabel.setAttribute('font-size', '0.08');
        pointsLabel.setAttribute('fill', 'black');
        pointsLabel.setAttribute('text-anchor', 'middle');
        pointsLabel.setAttribute('alignment-baseline', 'middle');
        pointsLabel.textContent = `${segment.points}`;
        svg.appendChild(pointsLabel);
    });
}

function saveSVG() {
    // Create a new Blob object with the SVG data
    const svgData = svg.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });

    // Create a link element, set its attributes for downloading
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const name = document.getElementById('name').value; // Assuming the name is in the first segment
    a.download = `${name}_life_wheel.svg`; // File name when downloaded
    a.textContent = 'Download SVG';

    // Append the link to the body
    document.body.appendChild(a);

    // Trigger a click on the link to start the download
    a.click();

    // Remove the link from the body
    document.body.removeChild(a);
}

function loadUploadedSVG(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const uploadedSVG = event.target.result;
        // Remove the following line to hide the uploaded SVG visually
        document.getElementById('uploadedSVGContainer').innerHTML = uploadedSVG;
    };
    reader.readAsText(file);
}

// Function to compare the uploaded SVG with the current life wheel SVG
function compareSVGs() {
    const uploadedSVGContainer = document.getElementById('uploadedSVGContainer');
    const currentSVGContainer = document.getElementById('currentSVGContainer');
    const comparisonResult = document.getElementById('comparisonResult');

    if (!uploadedSVGContainer) {
        console.error('Uploaded SVG containers not found.');
        return;
    } else if (!currentSVGContainer) {
        console.error('Current SVG containers not found.');
        return;
    }

    // Clear previous comparison results
    comparisonResult.innerHTML = '';

    // Get SVG elements
    const uploadedSVG = uploadedSVGContainer.querySelector('svg');
    const currentSVG = document.getElementById('lifeWheel');

    if (!uploadedSVG) {
        console.error('SVG elements not found in uploaded SVG containers.');
        return;
    } else if (!currentSVG) {
        console.error('Current SVG element not found.');
        return;
    }

    

    // Display comparison results or arrow as needed
    comparisonResult.innerHTML = 'Comparison arrow drawn from uploaded SVG to current life-wheel SVG.';

    if (uploadedSVGContainer && currentSVGContainer) {
        comparisonResult.innerHTML = uploadedSVG.outerHTML + svg.outerHTML;
    } else {
        console.error('SVG containers not found.');
    }

    const oldSegments = parseUploadedSVG(uploadedSVGContainer);
    console.log(oldSegments);

    // Create a table to display the before and after for each element
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headers = ['Livsområde', 'Før', 'Efter'];
    const headerRow = document.createElement('tr');
    headers.forEach((headerText) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows for each element
    segments.forEach((segment, index) => { // Add index parameter to forEach callback
        const row = document.createElement('tr');
    
        // Create table cells for element name, before, and after
        const nameCell = document.createElement('td');
        nameCell.textContent = segment.name;
        row.appendChild(nameCell);
    
        const beforeCell = document.createElement('td');
        const beforeSegment = index < oldSegments.length ? oldSegments[index] : null; // Use index to access oldSegments
        beforeCell.textContent = beforeSegment ? beforeSegment.points : '';
        row.appendChild(beforeCell);
    
        const afterCell = document.createElement('td');
        afterCell.textContent = segment.points;
        row.appendChild(afterCell);
    
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the table to the comparison result container
    comparisonResult.appendChild(table);

    // Function to calculate the after value for each element
    function calculateAfter(points) {
        
    }
    
}

function parseUploadedSVG(uploadedSVGContainer) {
    if (!uploadedSVGContainer) {
        console.error('Uploaded SVG container not found.');
        return;
    }

    const uploadedSVG = uploadedSVGContainer.querySelector('svg');
    if (!uploadedSVG) {
        console.error('SVG element not found in uploaded SVG container.');
        return;
    }

    const segmentElements = uploadedSVG.querySelectorAll('path');
    const segments = [];

    segmentElements.forEach((segmentElement) => {
        // Extract name from the next <text> element
        const nextTextElement = segmentElement.nextElementSibling;
        if (!nextTextElement || nextTextElement.tagName !== 'text') {
            console.warn('No <text> element found following <path>. Skipping.');
            return;
        }
        const name = nextTextElement.textContent.trim();
        
        const points = nextTextElement.nextElementSibling.textContent.trim();

        // Push segment to array if both name and points are valid
        if (name && points) {
            segments.push({ name, points });
        }
    });

    return segments;
}

function createSegmentTextFields(segments) {
    const segmentContainer = document.getElementById('livsmaalKommentar');
    if (!segmentContainer) {
        console.error('Segment container not found.');
        return;
    }

    segments.forEach((segment, index) => {
        const textField = document.createElement('textarea'); // Use textarea instead of input
        textField.style.width = '40%'; // Set the width of the text field to 100%
        textField.style.height = '100px'; // Set the height of the text field to 100px
        textField.addEventListener('input', (event) => {
            segments[index].name = event.target.value;
        });

        const label = document.createElement('label');
        label.textContent = segment.name + "(" + segment.points + ")" + ": ";
        label.appendChild(textField);

        segmentContainer.appendChild(label);

        // Add textarea for action steps
        const actionStepsField = document.createElement('textarea');
        actionStepsField.style.width = '40%'; // Set the width of the text field to 100%
        actionStepsField.style.height = '100px'; // Set the height of the text field to 100px
        actionStepsField.addEventListener('input', (event) => {
            segments[index].actionSteps = event.target.value;
        });

        const actionStepsLabel = document.createElement('label');
        actionStepsLabel.textContent = "Action Steps: ";
        actionStepsLabel.appendChild(actionStepsField);

        segmentContainer.appendChild(actionStepsLabel);
        segmentContainer.appendChild(document.createElement('br')); // Add line break after each text field
    });
}

function saveKommentarer() {
    const segmentContainer = document.getElementById('livsmaalKommentar');
    const name = document.getElementById('name').value;

    if (!segmentContainer) {
        console.error('Segment container not found.');
        return;
    }

    const textFields = segmentContainer.querySelectorAll('textarea');
    if (textFields.length === 0) {
        console.warn('No text fields found.');
        return;
    }

    let textContent = '';
    textFields.forEach((textField, index) => {
        const segmentName = textField.previousSibling.textContent.replace(':', '').trim();
        const segmentText = textField.value.trim();
        textContent += `${segmentName}: ${segmentText}\n`;

        if (index === textFields.length - 1) {
            // Last text field, save the content to a file
            const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${name}_kommentarer.txt`;
            a.textContent = 'Download Text';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
}
