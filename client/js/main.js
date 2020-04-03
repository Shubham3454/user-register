"use strict";

if(typeof window != 'undefined') {

	window.addEventListener('DOMContentLoaded', async () => {

        new Register();
	});
}

class Register {

    constructor() {

        this.container = document.querySelector('main');
        this.form = this.container.querySelector('form');
        this.checkCaptcha  = false
        this.setup();
    }

    setup() {

        this.form.addEventListener('submit',async (e) => {

            e.preventDefault();

            if(this.checkCaptcha && this.form.captcha_value.value != this.captachaValue) {
                return alert('Invalid Captcha');
            }

            const parameters = {
                "email"           : this.form.email.value,
                "secret_key"      : "fded5dfbbdecf015b0ae782abf340cb8",
                "name"            : this.form.name.value,
                "password"        : this.form.password.value,
                "is_captcha_added": this.checkCaptcha
            },
            option = {
                method: "POST"
            };

            try {
                const response = await fetchAPI('/register_user', parameters, option);
                if( response.status ==  406 && response.data.send_captcha) {
                    this.checkCaptcha = true;
                    return this.generateCaptach();
                }   

                    alert(response.message);
               
            }
            catch(e) {

                alert(e);
            }
            
        })  

    }

    generateCaptach() {
        
        const captchaArea = this.container.querySelector('.captcha-area');
        this.captachaValue = (Math.random()*100000000000000000).toString(36);

        captchaArea.querySelector('.value').textContent = this.captachaValue;

        captchaArea.classList.remove('hidden');
    }
}

var fetchAPI = async (endpoint, parameters, options = {}) => {

    if(!options.method) {
        options.method = "GET";
    }

    var response = await fetch(endpoint, {
        method: options.method,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(parameters)
    });

    if(response.status == 401) {
        throw 'Failed to Execute.'
    }

    response =  await response.json();

    return response;
}