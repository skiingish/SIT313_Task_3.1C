const https = require("https");

// Module will add a new memeber to Mailchimp
// Which will send a welcome email to the new user.

// Mailchimp list ID.
const listID = "16d3d8d774";

// Mailchimp dev API Token
const TOKEN = "42e2cb11cde13773f5d9f79058d73797-us6";

// Adds new user to the Mailchimp list which will send a welcome email to them.
function sendWelcomeEmail(firstname, lastname, email) {
    
    // Defined the data to be sent.
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    }

    // Convert to JSON format
    jsonData = JSON.stringify(data);

    // Mailchimp list URL.
    const url = "https://us6.api.mailchimp.com/3.0/lists/" + listID;
    
    // Options for the Mailchimp request.
    const opt = {
        method: "POST",
        auth: "defaultList:" + TOKEN
    }

    // POST request to the mail lists api to add a new memeber.
    const req = https.request(url, opt, (res) => {
        res.on("data", (data) => {
            console.log(JSON.parse(data))
        });
    });

    // Send the request data.
    req.write(jsonData);

    // Close the request.
    req.end();
}

// Export as a component for use in the iService Web Application. 
module.exports = sendWelcomeEmail;