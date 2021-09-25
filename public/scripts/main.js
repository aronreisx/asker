import Modal from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

//Selects all Check buttons from Room page
const checkButtons = document.querySelectorAll('.actions a.check');

//Adds an event listener for each Check button
checkButtons.forEach( button => {
    button.addEventListener('click', event => {handleModalContent(event, 'check')});
});

//Selects all Delete buttons from Room page
const deleteButtons = document.querySelectorAll('.actions a.delete');

//Adds an event listener for each Delete button
deleteButtons.forEach( button => {
    button.addEventListener('click', event => {handleModalContent(event, 'delete')});
});

//Handles content filling from Modal
function handleModalContent(event, action){
    event.preventDefault();

    const roomId = document.querySelector('#room-id').dataset.id;
    const questionId = event.target.dataset.id;

    const form = document.querySelector('.modal form');
    form.setAttribute('action', `/question/${roomId}/${questionId}/${action}`);

    if(action == 'check') {
        modalTitle.innerHTML = 'Mark as read';
        modalDescription.innerHTML = 'Are you sure you want to mark this question as read?';
        modalButton.innerHTML = 'Yes, mark as read';
        modalButton.classList.remove('red');
    } else if(action == 'delete') {
        modalTitle.innerHTML = 'Delete question';
        modalDescription.innerHTML = 'Are you sure you want to delete this question?';
        modalButton.innerHTML = 'Yes, delete this question';
        modalButton.classList.add('red');
    };

    modal.open();
};

//Close modal when user press ESC
document.querySelector('body').addEventListener('keyup', (event) => {
    if(event.key === 'Escape'){
        modal.close();
    }
})

//Copy the ID from room to clipboard by clicking on button
const buttonRoomId = document.querySelector('#room-id');
buttonRoomId.addEventListener('click', (event) => {
    navigator.clipboard.writeText(event.target.dataset.id);
});