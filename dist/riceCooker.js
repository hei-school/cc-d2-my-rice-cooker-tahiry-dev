"use strict";
/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint-env node */
Object.defineProperty(exports, "__esModule", { value: true });
var userPrompt = require('prompt-sync')();
var timers_1 = require("timers");
var cuissonEnCours = false;
var timeoutId;
function cuireRiz(type, quantite) {
    console.log("D\u00E9but de la cuisson pour ".concat(quantite, "g de riz ").concat(type, "..."));
    cuissonEnCours = true;
    timeoutId = (0, timers_1.setTimeout)(function () {
        if (cuissonEnCours) {
            console.log("Cuisson terminée !");
            cuissonEnCours = false;
        }
        else {
            console.log("Cuisson annulée.");
        }
    }, 10000);
}
function main() {
    console.log("Bienvenue dans le simulateur de rice-cooker !");
    // Demander à l'utilisateur de saisir le type de riz
    var typeDeRiz = userPrompt("Entrez le type de riz : ");
    // Demander à l'utilisateur de saisir la quantité de riz
    var quantiteDeRiz = parseInt(userPrompt("Entrez la quantité de riz (en grammes) : "), 10);
    // Afficher les informations de cuisson
    console.log("Type de riz : ".concat(typeDeRiz));
    console.log("Quantit\u00E9 de riz : ".concat(quantiteDeRiz, "g"));
    cuireRiz(typeDeRiz, quantiteDeRiz);
    // Annuler le délai avant de demander à l'utilisateur d'arrêter
    (0, timers_1.clearTimeout)(timeoutId);
    var choix = userPrompt("Tapez 'stop' pour arrêter la cuisson : ");
    if (choix !== null && choix.toLowerCase() === 'stop') {
        // Arrêter la cuisson
        cuissonEnCours = false;
        var miseAJour = userPrompt("Voulez-vous mettre à jour la quantité ou le type de riz ? (quantite/type/Aucun) : ");
        if (miseAJour !== null) {
            if (miseAJour.toLowerCase() === 'quantite') {
                quantiteDeRiz = parseInt(userPrompt("Entrez la nouvelle quantité de riz (en grammes) : "), 10);
            }
            else if (miseAJour.toLowerCase() === 'type') {
                typeDeRiz = userPrompt("Entrez le nouveau type de riz : ");
            }
        }
        var relancer = userPrompt("Voulez-vous relancer la cuisson ? (oui/non) : ");
        if (relancer !== null && relancer.toLowerCase() === 'oui') {
            cuireRiz(typeDeRiz, quantiteDeRiz);
        }
    }
    // Afficher les informations mises à jour
    console.log("Type de riz : ".concat(typeDeRiz));
    console.log("Quantit\u00E9 de riz : ".concat(quantiteDeRiz, "g"));
}
main();
