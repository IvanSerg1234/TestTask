import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox'),
          nextButtonCalc = document.querySelector('.popup_calc_button'),
          nextButtonProfile = document.querySelector('.popup_calc_profile_button');

    checkNumInputs('#width');
    checkNumInputs('#height');

    const message = {
        required: 'Заповніть усі поля'
    };

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодне' : state[prop] = 'Тепле';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
                validateForm(nextButtonCalc, ['form', 'width', 'height'], false);
                validateForm(nextButtonProfile, ['type', 'profile'], false);
            });
        });
    }

    // function displayStatusMessage(button, messageClass, messageText) {
    //     let statusMessage = document.querySelector(messageClass);
    //     if (!statusMessage) {
    //         statusMessage = document.createElement('div');
    //         statusMessage.classList.add(messageClass.replace('.', ''));
    //         button.parentNode.appendChild(statusMessage);
    //     }
    //     statusMessage.textContent = messageText;
    // }

    function validateForm(button, requiredFields, showMessage) {
        const isValid = requiredFields.every(field => state[field]);
        if (isValid) {
            button.disabled = false;
            // displayStatusMessage(button, messageClass, '');  // Clear message if valid
        } else {
            button.disabled = true;
            if (showMessage) {
                // displayStatusMessage(button, messageClass, message.required);  // Show message if invalid
            }
        }
    }

    // nextButtonCalc.addEventListener('click', (e) => {
    //     validateForm(nextButtonCalc, ['form', 'width', 'height'], '.status-calc', true);
    //     if (!nextButtonCalc.disabled) {
    //         document.querySelector('.popup_calc').style.display = 'none';
    //         document.querySelector('.popup_calc_profile').style.display = 'block';
    //     }
    // });

    // nextButtonProfile.addEventListener('click', (e) => {
    //     validateForm(nextButtonProfile, ['type', 'profile'], '.status-profile', true);
    //     if (!nextButtonProfile.disabled) {
    //         document.querySelector('.popup_calc_profile').style.display = 'none';
    //         document.querySelector('.popup_calc_end').style.display = 'block';
    //     }
    // });

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');

    validateForm(nextButtonCalc, ['form', 'width', 'height'], '.status-calc', false);
    validateForm(nextButtonProfile, ['type', 'profile'], '.status-profile', false);
};

export default changeModalState;
