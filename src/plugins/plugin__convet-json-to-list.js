export function convertJsonToArray(string) {
    let inputString = string;
    let resultArrayFirstChech = inputString.split("\r\n\r\n").map(element => element.trim());

    if (resultArrayFirstChech.length == 1) {
        if (resultArrayFirstChech[0].includes("– ") && resultArrayFirstChech[0].includes("\r\n")) {
            let resultArrayFirstCheck = inputString.split("\r\n");

            let resultArray = [];
            let currentElement = "";

            for (let i = 0; i < resultArrayFirstCheck.length; i++) {
                let trimmedElement = resultArrayFirstCheck[i].trim();

                if (trimmedElement.startsWith("– ")) {
                    if (currentElement !== "") {
                        resultArray.push(currentElement.replace("– ", ""));
                    }
                    currentElement = trimmedElement;
                } else {
                    currentElement += "\r\n" + trimmedElement;
                }
            }

            if (currentElement !== "") {
                resultArray.push(currentElement.replace("– ", ""));
            }
            return resultArray;
        } else {
            return resultArrayFirstChech;
        }
    } else {
        return resultArrayFirstChech;
    }
}