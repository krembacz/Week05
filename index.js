//A DOGGY PLAYDATE MENU APP THAT TAKES USER INPUT TO CREATE, MODIFY, VIEW, AND DELETE A DOGGY PLAYDATE. 


//Establishes the Owner data with parameters owner name and pet
class Owner {
    constructor(name, pet) {
        this.name = name;
        this.pet = pet;
    }
}

//Establishes group name (later user input) and array to accumulate owner properties. 
class PlaydateGroup {
    constructor(name) {
        this.name = name;
        this.allAttendees = [];
    }

    //Adds owner and parameters to array while checking that the input is valid. 
    addingAttendees(owner) {
        if (owner instanceof Owner) {
            this.allAttendees.push(owner);
        } else {
            throw new Error(`You can only add in an owner and a pup. Please try again`);
        }
    }
}

/*Array playdateGroup to accumulate groups that will be created through user input to be accessed later. 
this.selectedGroup starts as null because there is no selectedGroup until the user will input for it via index.*/
class Menu {
    constructor() {
        this.playdateGroup = [];
        this.selectedGroup = null;
    }

    /*start method initializes the code to be called upon. 
    assigned variable selection to associate with the main menu options
    selection will cycle through these options unless user inputs 0.*/
    start() {
        let selection = this.viewMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case "1":
                    this.createGroup();
                    break;
                case "2":
                    this.viewGroup();
                    break;
                case "3":
                    this.deleteGroup();
                    break;
                case "4":
                    this.displayGroups();
                    break;
                default:
                    selection = 0;
            }
            selection = this.viewMainMenuOptions();
        }
        alert("Goodbye- hope to see you and your pup around!");
    }

    //see main menu options for user to interact with 
    viewMainMenuOptions() {
        return prompt(`
                                WELCOME TO DOG DAYS

            Create the perfect doggy playdate group for your pup!
        ----------------------------------------------------------
        0) Leave without creating a group
        1) Create a new doggy playdate group 
        2) Search and edit specific groups 
        3) Cancel a group meeting 
        4) Display all planned doggy playdates 
        `);
    }

    //allows user to see submenu with the stated functions
    showGroupMenuOptions(groupInfo) {
        return prompt(`
        0) Go back
        1) Add attendees to group
        2) Remove attendees from group 
        ------------------------
        ${groupInfo}
        `);
    }

    //method with blank string passes through for loop, accumulates index, string concat, and value from array @ index specified                                                         
    displayGroups() {
        let groupString = "";
        for (let i = 0; i < this.playdateGroup.length; i++) {
            groupString += i + "#) " + this.playdateGroup[i].name + "\n";
        }
        alert(groupString);
    }

    //create a new group and store it in an array to be accessed later 
    createGroup() {
        let name = prompt("What will you call your group?");
        this.playdateGroup.push(new PlaydateGroup(name));
    }

    /* method takes user input for group array index
    Checks input will not result in error, assigns selectedGroup to group array index input
    Builds description of information pulled, uses for loop to iterate through all requested info 
    displays additional subselection menu along with accumulated description variable*/
    viewGroup() {
        let index = prompt("Find a specific group- enter index below!");
        if (index > -1 && index < this.playdateGroup.length) {
            this.selectedGroup = this.playdateGroup[index];
            let description = "Group Name: " + this.selectedGroup.name + "\n";

            for (let i = 0; i < this.selectedGroup.allAttendees.length; i++) {
                description += i + ") Owner: " + this.selectedGroup.allAttendees[i].name + "    Pet: "
                    + this.selectedGroup.allAttendees[i].pet + "\n";
            }

            let subSelection = this.showGroupMenuOptions(description);
            switch (subSelection) {
                case "1":
                    this.addAttendees();
                    break;
                case "2":
                    this.removeAttendees();
            }
        }
    }

    //takes user input for index, checks for input validity, and removes index array data from playdateGroup array using splice method  
    deleteGroup() {
        let index = prompt("Please enter the index of the group you'd like to delete");
        if (index > -1 && index < this.playdateGroup.length) {
            this.playdateGroup.splice(index, 1)
        }
        alert("The group has been successfully deleted");
    }

    //accepts two prompts, owner name and pet and pushes to allAttendees array as a new instance 
    addAttendees() {
        let name = prompt("What is the owner's name?");
        let pet = prompt("What the pup's name?");
        this.selectedGroup.allAttendees.push(new Owner(name, pet));
    }

    //accepts index via prompt, checks for input validity, and removes index array data using splice method
    removeAttendees() {
        let index = prompt("Plans change? Remove an owner and pet by index below:");
        if (index > -1 && index < this.selectedGroup.allAttendees.length) {
            this.selectedGroup.allAttendees.splice(index, 1);
        }
        alert("The pet and owner have been successfully been removed from the group - hope to see them next time!");
    }
}

//assigns variable to class method and initializes program. 
let menu = new Menu();
menu.start(); 