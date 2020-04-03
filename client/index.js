"use strict";

const express = require('express');
const router = express.Router();

router.use(express.static('./client'));

class Register {

    constructor() {
        
        this.styleSheets = [
            'css/main.css'
        ];

        this.scripts = [
            'js/main.js'
        ]
    }

    async body() {
        
        return `
            <!DOCTYPE html>
                <head>
                    ${this.styleSheets.map(s => '<link rel="stylesheet" type="text/css" href="' + s + '">\n').join('')}
                    ${this.scripts.map(s => '<script src="' + s + '"></script>\n').join('')}
                </head>
                <body>

                    <main>
                        <h3>Welcome</h3>
                        <form>
                            <label>
                                <span>Name</span>
                                <input name="name" type="text" placeholder="Enter your name">
                            </label>

                            <label>
                                <span>Email</span>
                                <input name="email" type="email" placeholder="Enter your email">
                            </label>

                            <label>
                                <span>Password</span>
                                <input name="password" type="password" placeholder="Enter your password">
                            </label>

                            <div class="captcha-area hidden">
                                <div class="value"></div>
                                <label class="submit">
                                    <span>Enter the value shown above</span>
                                    <input type="text" name="captcha_value">
                                </label>
                            </div>

                            <button type="submit" class="register-form">Submit</button>
                        </form>
                    </main>
                </body>
            </html>
        `;
    }
}

router.get('/register', async (req, res) => {

	const register = new Register();

	res.send(await register.body());
});

module.exports = router;