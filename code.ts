/*----------------------------------------------------------------
/   Filename: code.ts   
/   Title: Random Email Address Generator
/   Purpose: Source code for email randomizer
/   Authors: Caleb Faulkner and Caleb Dawson
/   Description: Uses hidden UI to interact with user's selection
      and replace text with randomized email adresses.  This file
      is written completely in TypeScript.
/*---------------------------------------------------------------*/

/* --- Main Block --- */
figma.showUI(__html__, {visible: false});
figma.ui.onmessage = async (msg) => {
  let selection = [];
  figma.currentPage.selection.forEach(i => {
    if(['group', 'frame'].includes(i.type.toLowerCase())) selection.push(...i.children);
    if(i.type.toLowerCase() === 'text') selection.push(i);
  });
  if(selection.length > 0){
    for(let i = 0; i < selection.length; i++) {
      try{
        await figma.loadFontAsync(selection[i].fontName);
        selection[i].characters = generateEmail();
      } 
      catch (e){
        console.error(e); // Missing font error
      }
    }
  } else {  // Default Case - Selection has no text
    console.log("ERROR - The selection has no text.");
  }
  figma.closePlugin();
};

/* --- Email List --- */
const emails = {
  firstInitial: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
  lastNames: ['smith','johnson','williams','brown','jones','garcia','miller','davis','rodriguez','martinez','hernandez','lopez','gonzalez','wilson','anderson','thomas','taylor','moore','jackson','george','martin','lee','perez','thompson','white','harris','sanchez','clark','ramirez','lewis','robinson','walker','young','allen','king','wright','scott','torres','nguyen','hill','flores','green','adams','nelson','baker','hall','rivera','campbell','mitchell','carter','roberts'],
  domains: ['@gmail.com','@icloud.com','@hotmail.com','@outlook.com','@yahoo.com','@aol.com','@msn.com']
}

/* --- Randomizer Function --- */
const generateEmail = () => {
  let randomEmail = emails.firstInitial[Math.floor(Math.random() * (emails.firstInitial.length - 1))] +
                    emails.lastNames[Math.floor(Math.random() * (emails.lastNames.length - 1))] +
                    emails.domains[Math.floor(Math.random() * (emails.domains.length - 1))];
  return randomEmail;
}