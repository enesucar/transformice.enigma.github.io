document.getElementById('nickname').addEventListener("keyup", function (evt) {
    changeTheResultLabel();
}, false);

function changeTheResultLabel() {
    var userName = document.getElementById("nickname").value.toLowerCase();
    var text = CreateStringForUser(userName);

    const span = document.getElementById('result');
    span.textContent = "/ruasonid " + "" + text + "";
}

function CreateStringForUser(userName) {
        var caesarShift = function (str, amount) {
            // Wrap the amount
            if (amount < 0) {
                return caesarShift(str, amount + 26);
            }

            // Make an output variable
            var output = "";

            // Go through each character
            for (var i = 0; i < str.length; i++) {
                // Get the character we'll be appending
                var c = str[i];

                // If it's a letter...
                if (c.match(/[a-z]/i)) {
                    // Get its code
                    var code = str.charCodeAt(i);

                    // Uppercase letters
                    if (code >= 65 && code <= 90) {
                        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
                    }

                    // Lowercase letters
                    else if (code >= 97 && code <= 122) {
                        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
                    }
                // Append
                output += c;
                }
            }

            // All done!
            return output;
        };

        function isLetter(str) {
            return str.length === 1 && str.match(/[a-zA-Z]/i)
        }

        function isUpperCase(character) {
            if (character === character.toUpperCase()) {
                return true
            }
            if (character === character.toLowerCase()) {
                return false
            }
        }

        function encrypt(message, key) {
            let result = ''

            for (let i = 0, j = 0; i < message.length; i++) {
                const c = message.charAt(i)
                if (isLetter(c)) {
                    if (isUpperCase(c)) {
                        result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
                    } else {
                        result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
                    }
                } else {
                    result += c
                }
                j = ++j % key.length
            }
            return result
        }

        function decrypt(message, key) {
            let result = ''

            for (let i = 0, j = 0; i < message.length; i++) {
                const c = message.charAt(i)
                if (isLetter(c)) {
                    if (isUpperCase(c)) {
                        result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
                    } else {
                        result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
                    }
                } else {
                    result += c
                }
                j = ++j % key.length
            }
            return result
        }

        return encrypt(caesarShift(userName, 1), 'DINO');
    }