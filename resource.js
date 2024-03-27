document.addEventListener('DOMContentLoaded', function() {
    var dropdownButton1 = document.getElementById('dropdown1');
    var dropdownButton2 = document.getElementById('dropdown2');
    var dropdownButton3 = document.getElementById('dropdown3');
    var dropdownButton4 = document.getElementById('dropdown4');
    var dropdownButton5 = document.getElementById('dropdown5');
    var dropdownContent = document.getElementById('dropdownContent');
    var dropdownContent1 = document.getElementById('dropdownContent1');
    var dropdownContent2 = document.getElementById('dropdownContent2');
    var dropdownContent3 = document.getElementById('dropdownContent3');
    var dropdownContent4 = document.getElementById('dropdownContent4');

    dropdownButton1.addEventListener('click', function() {
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });

    dropdownButton2.addEventListener('click', function() {
        if (dropdownContent1.style.display === 'block') {
            dropdownContent1.style.display = 'none';
        } else {
            dropdownContent1.style.display = 'block';
        }
    });

    dropdownButton3.addEventListener('click', function() {
        if (dropdownContent2.style.display === 'block') {
            dropdownContent2.style.display = 'none';
        } else {
            dropdownContent2.style.display = 'block';
        }
    });

    dropdownButton4.addEventListener('click', function() {
        if (dropdownContent3.style.display === 'block') {
            dropdownContent3.style.display = 'none';
        } else {
            dropdownContent3.style.display = 'block';
        }
    });

    dropdownButton5.addEventListener('click', function() {
        if (dropdownContent4.style.display === 'block') {
            dropdownContent4.style.display = 'none';
        } else {
            dropdownContent4.style.display = 'block';
        }
    });
});