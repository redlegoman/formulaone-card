import { HomeAssistant } from "custom-card-helpers";
import { html, HTMLTemplateResult } from "lit-html";
import { until } from 'lit-html/directives/until.js';
import { ConstructorStanding, FormulaOneCardConfig } from "../types/formulaone-card-types";
import { BaseCard } from "./base-card";

export default class ConstructorStandings extends BaseCard {
    defaultTranslations = {
        'constructor' : 'Constructor',   
        'points' : 'Pts',
        'wins' : 'Wins'
    };

    constructor(hass: HomeAssistant, config: FormulaOneCardConfig) {
        super(hass, config);
    }    
    
    cardSize(): number {        
        return 2;
        // const data = this.sensor.data as ConstructorStanding[];        
        // if(!data) {
        //     return 2;
        // }

        // return (data.length == 0 ? 1 : data.length / 2 ) + 1;
    }

    renderStandingRow(standing: ConstructorStanding): HTMLTemplateResult {
        return html`
            <tr>
                <td class="width-50 text-center">${standing.position}</td>
                <td>${standing.Constructor.name}</td>
                <td class="width-60 text-center">${standing.points}</td>
                <td class="text-center">${standing.wins}</td>
            </tr>`;
    }

    render() : HTMLTemplateResult {

        return html`${until(
            this.client.GetConstructorStandings().then(response => response
              ? html`
                    <table>
                        <thead>
                        <tr>
                            <th class="width-50">&nbsp;</th>
                            <th>${this.translation('constructor')}</th>
                            <th class="width-60 text-center">${this.translation('points')}</th>
                            <th class="text-center">${this.translation('wins')}</th>
                        </tr>
                        </thead>
                        <tbody>
                            ${response.map(standing => this.renderStandingRow(standing))}
                        </tbody>
                    </table>
                    `
              : html`Error getting standings`),
            html`Loading...`,
          )}`;
    }
}
