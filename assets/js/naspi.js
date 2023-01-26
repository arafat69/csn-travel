function employement(id){
    if(id.checked) {
        document.getElementById("employement").style.display="block"
        document.getElementById("reddito_wrap").style.display="block"
    }else{
        document.getElementById("employement").style.display="none"
        document.getElementById("reddito_wrap").style.display="none"
    }
}

function setReddito(val, customer = 0){
    let url = document.getElementById('rebbito')
    if(val){
        url.style.display = 'inline-block'
        let route = `/shop/print-pdf/${customer}/reddito?amount=${val}`
        $('#reddito_url').val(route);
        url.setAttribute('href', route)
    }else{
        $('#reddito_url').val();
        url.style.display = 'none'
        url.setAttribute('href', '#')
    }
}

function dayCount(date){

    var endDate = (new Date(date.value)).getTime()
    let difference = endDate - Date.now();
    let totalDay = Math.ceil(difference / (1000 * 3600 * 24));
    let startDate = document.getElementById('start_date');

    let setDatre = moment(date.value).subtract(1, 'days').format('Y-MM-DD');
    startDate.setAttribute('max', setDatre);
    startDate.removeAttribute('disabled');

    $('#days').val(Math.abs(totalDay))

    if(Math.abs(totalDay) > 68){
        $("#date-Confirm").modal('show');
    }
}

function confirm(val)
{
    $('#date_confirm').val(val)
}

$(document).ready(function() {
    $('select[name="termination"]').on('change', function() {
        var termination = $(this).val();

        $('select[name="report_type"]').empty();
        if(termination === 'Fine contratto'){
            $('select[name="report_type"]').append('<option value="determinato">determinato</option>');
            return
        }
        $('select[name="report_type"]').append('<option value="determinato">determinato</option>')
        $('select[name="report_type"]').append('<option value="indeterminato">indeterminato</option>')
        $('select[name="report_type"]').append('<option value="a chiamata">a chiamata</option>')
    })
})

function submitTemporary(){
    $('#temporary').val(1)
    document.getElementById("problem").submit();
}

function submitProblem(itali){

    var point = 0

    let company = document.getElementById('company_name')
    if(!company.value){
        company.classList.add('is-invalid')
        document.getElementById('company_name_err').style.color= '#dc3545'
        var point = (point + 1)
    }else{
        company.classList.remove('is-invalid')
        document.getElementById('company_name_err').style.color= ''
    }

    let termination = document.getElementById('termination')
    if(!termination.value){
        termination.classList.add('is-invalid')
        document.getElementById('termination_err').style.color= '#dc3545'
        var point = (point + 1)
    }else{
        termination.classList.remove('is-invalid')
        document.getElementById('termination_err').style.color= ''
    }

    let report_type = document.getElementById('report_type')
    if(!report_type.value){
        report_type.classList.add('is-invalid')
        document.getElementById('report_type_err').style.color= '#dc3545'
        var point = (point + 1)
    }else{
        report_type.classList.remove('is-invalid')
        document.getElementById('report_type_err').style.color= ''
    }

    let start_date = document.getElementById('start_date')
    if(!start_date.value){
        start_date.classList.add('is-invalid')
        document.getElementById('start_date_err').style.color= '#dc3545'
        var point = (point + 1)
    }else{
        start_date.classList.remove('is-invalid')
        document.getElementById('start_date_err').style.color= ''
    }

    let end_date = document.getElementById('end_date')
    if(!end_date.value){
        end_date.classList.add('is-invalid')
        document.getElementById('end_date_err').style.color= '#dc3545'
        var point = (point + 1)
    }else{
        end_date.classList.remove('is-invalid')
        document.getElementById('end_date_err').style.color= ''
    }

    let date_confirm = document.getElementById('date_confirm')
    let days = document.getElementById('days')
    if(date_confirm.value === '0'){
        if(days.value > 68){
            end_date.classList.add('is-invalid')
            document.getElementById('days_err').style.display= 'block'
            var point = (point + 1)
        }else{
            end_date.classList.remove('is-invalid')
        }
    }else{
        document.getElementById('days_err').style.display= 'none'
    }

    let iban = document.getElementById('iban')
    if(!iban.value){
        iban.classList.add('is-invalid')
        document.getElementById('iban_err').style.color= '#dc3545'
        var point = (point + 1)
    }else{
        iban.classList.remove('is-invalid')
        document.getElementById('iban_err').style.color= ''
    }

    let self_employee = document.getElementById('self_employee')

    if(self_employee.checked){
        let start_business = document.getElementById('start_business')
        let present_income = document.getElementById('present_income')

        let reddito = document.getElementById("reddit").value;
        let setAbleDate = moment(new Date()).format('Y-MM-DD');

        if(!start_business.value || start_business.value >= setAbleDate){
            start_business.classList.add('is-invalid')
            document.getElementById('start_business_err').style.color= '#dc3545'
            var point = (point + 1)
        }else{
            start_business.classList.remove('is-invalid')
            document.getElementById('start_business_err').style.color= ''
        }
        if(!present_income.value){
            present_income.classList.add('is-invalid')
            document.getElementById('present_income_err').style.color= '#dc3545'
            var point = (point + 1)
        }else{
            present_income.classList.remove('is-invalid')
            document.getElementById('present_income_err').style.color= ''
        }
        if(reddito == 0){
            document.getElementById('rebbito_err').style.color= '#dc3545'
            var point = (point + 1)
        }
        else
            document.getElementById('rebbito_err').style.color= ''

    }
    var point = (fileValidate(itali) + point)

    if(!point)
        document.getElementById("problem").submit();
}

function fileValidate(itali){
    var point = 0
    //  Carta di identità
    // let id_card = document.getElementById("id_card").files.length;
    let id_card = document.getElementById("hasId").value;

    if(id_card == 0){
        document.getElementById('card_err').style.color= '#dc3545'
        var point = (point + 1)
    }else
        document.getElementById('card_err').style.color= ''

    if(itali){
        // let permits = document.getElementById("residency_permits").files.length;
        let permits = document.getElementById("residency").value;
        if(permits == 0){
            document.getElementById('permits_err').style.color= '#dc3545'
            var point = (point + 1)
        }else
            document.getElementById('permits_err').style.color= ''
    }

    //  Lettera di Licenziamento o Unilav Cessazione
    // let dismissal = document.getElementById("dismissal_unilavs").files.length;
    let dismissal = document.getElementById("dismissal").value;
    if(dismissal == 0){
        document.getElementById('dismissal_err').style.color= '#dc3545'
        var point = (point + 1)
    }else
        document.getElementById('dismissal_err').style.color= ''

    //  Codice Fiscale
    // let fiscal = document.getElementById("fiscal_codes").files.length;
    let fiscal = document.getElementById("fiscal").value;
    if(fiscal == 0){
        document.getElementById('fiscal_err').style.color= '#dc3545'
        var point = (point + 1)
    }else
        document.getElementById('fiscal_err').style.color= ''

    //  Ultima Busta Paga
    // let paychecks = document.getElementById("paychecks").files.length;
    let paychecks = document.getElementById("paycheck").value;
    if(paychecks == 0){
        document.getElementById('paychecks_err').style.color= '#dc3545'
        var point = (point + 1)
    }else
        document.getElementById('paychecks_err').style.color= ''

    //  Modello SR163
    // let models = document.getElementById("models").files.length;
    let models = document.getElementById("model").value;
    if(models == 0){
        document.getElementById('models_err').style.color= '#dc3545'
        var point = (point + 1)
    }else
        document.getElementById('models_err').style.color= ''

    //  Mandato di assistenza
    // let assistance = document.getElementById("assistance_mandates").files.length;
    let assistance = document.getElementById("assistance").value;
    if(assistance == 0){
        document.getElementById('assistance_err').style.color= '#dc3545'
        var point = (point + 1)
    }else
        document.getElementById('assistance_err').style.color= ''

    //  Liberatoria
    // let disclaimers = document.getElementById("disclaimers").files.length;
    let disclaimers = document.getElementById("disclaimers").value;
    if(disclaimers == 0){
        document.getElementById('disclaimers_err').style.color= '#dc3545'
        var point = (point + 1)
    }else
        document.getElementById('disclaimers_err').style.color= ''

    return point
}
