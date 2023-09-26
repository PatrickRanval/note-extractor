document.querySelector('#submitButton').addEventListener('click', processCode);
document.querySelector('#copyNoteButton').addEventListener('click', () => copyToClipboard('noteOutput'));
document.querySelector('#copyCodeButton').addEventListener('click', () => copyToClipboard('codeOutput'));

function processCode() {
    const rawInput = document.querySelector('#rawInput').value;
    const commentPattern = /\/\/(.+?)\n|\/\*([\s\S]+?)\*\//g;  //The nastiest regex ever
    const comments = [];
    const codeLines = [];
    let match;

    while ((match = commentPattern.exec(rawInput)) !== null) {
        const comment = match[1] || match[2];
        comments.push(randomizeFormatting(comment.trim()));
    }

    const codeWithoutComments = rawInput.replace(commentPattern, '');

    const inputLines = codeWithoutComments.split('\n').filter(line => line.trim() !== '');

    document.querySelector('#noteOutput').value = comments.join('\n');
    document.querySelector('#codeOutput').value = inputLines.join('\n');
}

function randomizeFormatting(comment) {
    const formattingOptions = ['**', '_'];
    const formattedComment = comment.split(' ');

    for (let i = 1; i < formattedComment.length; i++) {
        if (i % 15 === 0) {
            const randomFormat = formattingOptions[Math.floor(Math.random() * formattingOptions.length)];
            formattedComment[i] = randomFormat + formattedComment[i] + randomFormat;
        }
    }

    return formattedComment.join(' ');
}

//Questionable Function

function copyToClipboard(textareaId) {
    const textarea = document.querySelector(`#${textareaId}`);
    
    if (document.queryCommandSupported('copy')) {
        textarea.select();
        document.execCommand('copy');
        console.log(`Text copied to clipboard: ${textarea.value}`);
    } else {
        console.error('Copying to clipboard is not supported in this browser.');
    }
}

//Here's a comment
