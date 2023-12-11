/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint-env node */

const userPrompt = require('prompt-sync')();
import { setTimeout, clearTimeout } from 'timers';

let cuissonEnCours = false;
let timeoutId: NodeJS.Timeout;

function cuireRiz(type: string, quantite: number): void {
    console.log(`Début de la cuisson pour ${quantite}g de riz ${type}...`);

    cuissonEnCours = true;

    timeoutId = setTimeout(() => {
        if (cuissonEnCours) {
            console.log("Cuisson terminée !");
            cuissonEnCours = false;
        } else {
            console.log("Cuisson annulée.");
        }
    }, 10000);
}

function main(): void {
    console.log("Bienvenue dans le simulateur de rice-cooker !");

    // Demander à l'utilisateur de saisir le type de riz
    let typeDeRiz: string = userPrompt("Entrez le type de riz : ");

    // Demander à l'utilisateur de saisir la quantité de riz
    let quantiteDeRiz: number = parseInt(userPrompt("Entrez la quantité de riz (en grammes) : "), 10);

    // Afficher les informations de cuisson
    console.log(`Type de riz : ${typeDeRiz}`);
    console.log(`Quantité de riz : ${quantiteDeRiz}g`);


    cuireRiz(typeDeRiz, quantiteDeRiz);

    // Annuler le délai avant de demander à l'utilisateur d'arrêter
    clearTimeout(timeoutId);

    const choix: string | null = userPrompt("Tapez 'stop' pour arrêter la cuisson : ");

    if (choix !== null && choix.toLowerCase() === 'stop') {
        // Arrêter la cuisson
        cuissonEnCours = false;

        const miseAJour: string | null = userPrompt("Voulez-vous mettre à jour la quantité ou le type de riz ? (quantite/type/Aucun) : ");
        if (miseAJour !== null) {
            if (miseAJour.toLowerCase() === 'quantite') {
                quantiteDeRiz = parseInt(userPrompt("Entrez la nouvelle quantité de riz (en grammes) : "), 10);
            } else if (miseAJour.toLowerCase() === 'type') {
                typeDeRiz = userPrompt("Entrez le nouveau type de riz : ");
            }
        }
        const relancer: string | null = userPrompt("Voulez-vous relancer la cuisson ? (oui/non) : ");
        if (relancer !== null && relancer.toLowerCase() === 'oui') {
            cuireRiz(typeDeRiz, quantiteDeRiz);
        }
    }

    // Afficher les informations mises à jour
    console.log(`Type de riz : ${typeDeRiz}`);
    console.log(`Quantité de riz : ${quantiteDeRiz}g`);
}

main();
