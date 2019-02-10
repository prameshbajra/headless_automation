const firstNames = [
    "Pramesh", "Suzal", "Rajat", "Pavan", "Susish"
]

const lastNames = [
    "Bajracharya", "Shakya", "Pandey", "Gupta", "Yekabote", "Aacharya"
]

const domain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'msn.com', 'outlook.com', 'live.com', 'me.com', 'aol.com', 'mac.com'];

exports.firstNames = firstNames;

exports.lastNames = lastNames;

exports.domain = domain;

exports.generateEmail = () => {

    const firstname = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastname = lastNames[Math.floor(Math.random() * lastNames.length)];
    const arr = [];

    for (let i = 0; i < domain.length; i = i + 1) {
        const p1 = firstname + "@" + domain[i] + ",";
        const p2 = firstname + lastname + "@" + domain[i] + ",";
        const p3 = firstname + "." + lastname + "@" + domain[i] + ",";
        const p4 = firstname.charAt(0) + lastname + "@" + domain[i] + ",";
        const p5 = firstname.charAt(0) + "." + lastname + "@" + domain[i] + ",";
        const p6 = firstname + lastname.charAt(0) + "@" + domain[i] + ",";
        const p7 = firstname + "." + lastname.charAt(0) + "@" + domain[i] + ",";
        const p8 = firstname.charAt(0) + lastname.charAt(0) + "@" + domain[i] + ",";
        const p9 = firstname + "_" + lastname + "@" + domain[i] + ",";
        const p10 = firstname.charAt(0) + "_" + lastname + "@" + domain[i] + ",";
        const p11 = lastname + firstname + "@" + domain[i] + ",";
        const p12 = lastname + "." + firstname + "@" + domain[i] + ",";
        const p13 = lastname + firstname.charAt(0) + "@" + domain[i] + ",";
        const p14 = lastname + "." + firstname.charAt(0) + "@" + domain[i];

        const addresses = p1 + " " + p2 + " " + p3 + " " + p4 + " " + p5 + " " + p6 + " " + p7 + " " + p8 + " " + p9 + " " + p10 + " " + p11 + " " + p12 + " " + p13 + " " + p14;
        arr.push(addresses)
    }

    return arr;
}