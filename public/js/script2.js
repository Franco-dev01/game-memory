const divcontainer = document.querySelector('.cont');
const BigData= [{
    niveau: 1,
    nbCase: 4,
    caseVisible: 1,
    tempTransition: 500,
    tempAffichage: 1000,
    ordre: false,
    heightDiv: 250,
    widthDiv: 320
},
    {
        niveau: 2,
        nbCase: 9,
        caseVisible: 3,
        tempTransition: 490,
        tempAffichage: 975,
        ordre: false,
        heightDiv: 170,
        widthDiv: 170
    },
    {
        niveau: 3,
        nbCase: 16,
        caseVisible: 5,
        tempTransition: 480,
        tempAffichage: 950,
        ordre: true,
        heightDiv: 130,
        widthDiv: 130
    },
    {
        niveau: 4,
        nbCase: 24,
        caseVisible: 7,
        tempTransition: 470,
        tempAffichage: 925,
        ordre: true,
        heightDiv: 125,
        widthDiv: 106
    },
    {
        niveau:5,
        nbCase: 35,
        caseVisible: 9,
        tempTransition: 460,
        tempAffichage: 900,
        ordre: false,
        heightDiv: 100,
        widthDiv: 90
    },
    {
        niveau: 6,
        nbCase: 48,
        caseVisible: 11,
        tempTransition: 450,
        tempAffichage: 875,
        ordre: true,
        heightDiv: 85.10,
        widthDiv: 75
    },
    {
        niveau: 7,
        nbCase: 63,
        caseVisible: 13,
        tempTransition: 440,
        tempAffichage: 850,
        ordre: false,
        heightDiv: 70,
        widthDiv: 70
    },
    {
        niveau: 8,
        nbCase: 80,
        caseVisible: 15,
        tempTransition: 430,
        tempAffichage: 825,
        ordre: false,
        heightDiv: 63,
        widthDiv: 63
    },
    {
        niveau: 9,
        nbCase: 99,
        caseVisible: 17,
        tempTransition: 420,
        tempAffichage: 800,
        ordre: true,
        heightDiv: 55,
        widthDiv: 55
    },
    {
        niveau: 10,
        nbCase: 120,
        caseVisible: 19,
        tempTransition: 410,
        tempAffichage: 775,
        ordre: true,
        heightDiv: 50,
        widthDiv: 50
    },
    {
        niveau: 11,
        nbCase: 145,
        caseVisible: 21,
        tempTransition: 400,
        tempAffichage: 750,
        ordre: false,
        heightDiv: 44,
        widthDiv: 44
    },
    {
        niveau: 12,
        nbCase: 168,
        caseVisible: 23,
        tempTransition: 390,
        tempAffichage: 725,
        ordre: false,
        heightDiv: 44,
        widthDiv: 44
    },
    {
        niveau: 13,
        nbCase: 195,
        caseVisible: 25,
        tempTransition: 380,
        tempAffichage: 700,
        ordre: false,
        heightDiv: 39,
        widthDiv: 39
    },
    {
        niveau: 14,
        nbCase: 224,
        caseVisible: 27,
        tempTransition: 370,
        tempAffichage: 675,
        ordre: false,
        heightDiv: 36.5,
        widthDiv: 36.5
    },
    {
        niveau: 15,
        nbCase: 255,
        caseVisible: 29,
        tempTransition: 370,
        tempAffichage: 600,
        ordre: false,
        heightDiv: 34.2,
        widthDiv: 34.2
    },
    {
        niveau: 16,
        nbCase: 288,
        caseVisible: 31,
        tempTransition: 360,
        tempAffichage: 575,
        ordre: false,
        heightDiv: 32.3,
        widthDiv: 32.3
    },
    {
        niveau: 17,
        nbCase: 323,
        caseVisible: 33,
        tempTransition: 350,
        tempAffichage: 550,
        ordre: true,
        heightDiv: 30.6,
        widthDiv: 30.6
    },
    {
        niveau: 18,
        nbCase: 360,
        caseVisible: 35,
        tempTransition: 340,
        tempAffichage: 525,
        ordre: false,
        heightDiv: 29,
        widthDiv: 29
    },
];