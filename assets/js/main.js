// const { defaultsDeep } = require("lodash");

function closeEye(){
    let password = document.querySelector('#password');
    let password_confirmation = document.querySelector('#password_confirmation');

    let type = password.getAttribute('type')
    let eye = document.getElementById("eye");
    let eye2 = document.getElementById("eye_2");

    if(type === 'password'){
        password.setAttribute('type', 'text')
        password_confirmation.setAttribute('type', 'text')

        eye.classList.add('fa-eye')
        eye.classList.remove('fa-eye-slash')

        eye2.classList.add('fa-eye')
        eye2.classList.remove('fa-eye-slash')
    }else{
        password.setAttribute('type', 'password')
        password_confirmation.setAttribute('type', 'password')

        eye.classList.add('fa-eye-slash')
        eye.classList.remove('fa-eye')

        eye2.classList.add('fa-eye-slash')
        eye2.classList.remove('fa-eye')
    }
}

function closePasswordEye(){
    let password = document.querySelector('#password');

    let type = password.getAttribute('type')
    let eye = document.getElementById("eye");

    if(type === 'password'){
        password.setAttribute('type', 'text')

        eye.classList.add('fa-eye')
        eye.classList.remove('fa-eye-slash')
    }else{
        password.setAttribute('type', 'password')

        eye.classList.add('fa-eye-slash')
        eye.classList.remove('fa-eye')
    }
}
function toggleSidebar(){
    let sideBar = document.getElementById('sidebar')
    let toggleBtn = document.getElementById('toggle-btn')

    if(sideBar.className == 'sidebar-wrap hide'){
        sideBar.classList.remove('hide')
        toggleBtn.classList.add('moveBtn')
    }else{
        sideBar.classList.add('hide')
        toggleBtn.classList.remove('moveBtn')

    }
}

window.addEventListener("load",function(){
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
        let inputVal = inputs[i].value
        let inputID = inputs[i].id
        if(inputID && inputVal){
            preview(inputVal, inputID)
        }
    }

    var selects = document.getElementsByTagName("select");
    for(var s = 0; s < selects.length; s++){
        var selectVal = selects[s].options[selects[s].selectedIndex].value;
        var selectText = selects[s].options[selects[s].selectedIndex].text;
        var selectID = selects[s].id;

        if(selectVal !== '-' && selectText && selectID){
            preview(selectText, selectID)
        }
    }
},false);

passFromSelect = function(e, id){
    var opt = e.target.options[e.target.selectedIndex];
    preview(opt.text, id)
}

preview = function(val, id){
    var id = id + '_prv'
    if(!val){
        $('#' + id).html('--')
    }else{
        $('#' + id).html(val)
    }
}

function checkVat(value) {
    preview(value, 'vat_id')
    let checkVal = validateVatNumber(value);
    var error = document.getElementById('vat_erro');
    var input = document.getElementById('vat_id');
    if (!checkVal) {
        error.innerText = 'Your VAT ID is invalid.'
        input.classList.add('is-invalid')
        $("input[name='vat_is_valid']").val('1')
        return;
    }
    $("input[name='vat_is_valid']").val('')
    error.innerText = ''
    input.classList.remove('is-invalid')
}

function notCF(value) {
    preview(value, 'cf')
    let total = value.length;
    let isNumber = isNaN(value);
    let error = document.getElementById('cf_err');
    cf.classList.remove('is-invalid')
    error.innerText = ''

    if (total === 11 && !isNumber) {
        $("input[name='is_cf']").val(1)
        let checkVal = validateVatNumber(value);
        let cf = document.getElementById('cf');
        if (!checkVal) {
            document.getElementById('old-err').style.display = 'none'
            $("input[name='is_cf']").val(2)
            error.innerText = 'Your VAT ID is invalid.'
            cf.classList.add('is-invalid')
        } else {
            $("input[name='is_cf']").val(3)
        }
        return
    }

    $("input[name='is_cf']").val('')
    return;
}

validateVatNumber = function(value) {
    var VAT_NUMBER_LENGTH = 11;

    var validVat = false;

    if (value && value.length == VAT_NUMBER_LENGTH) {

        var x = 0;
        var y = 0;

        for (var position = 0; position < VAT_NUMBER_LENGTH; ++position) {
            if (((position + 1) % 2) > 0) {
                x += parseInt(value.charAt(position));
            } else {
                var double = parseInt(value.charAt(position)) * 2;
                if (double > 9) {
                    double -= 9;
                }
                y += double;
            }
        }

        if ((x + y) % 10 == 0) {
            validVat = true;
        }
    }

    return validVat;
};