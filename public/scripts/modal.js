export default function Modal(){

    const modalWrapper = document.querySelector('.modal-wrapper');
    const formInnput = document.querySelector('.modal form input');
    const cancelButton = document.querySelector('.button.cancel');

    cancelButton.addEventListener('click', close);

    function open(){
        //add class Active to modal element html
        modalWrapper.classList.add('active');
    }
    function close(){
        //Clear input before close
        formInnput.value = '';
        //Remove class Active from Modal
        modalWrapper.classList.remove('active');
    }

    return{
        open,
        close
    }
}