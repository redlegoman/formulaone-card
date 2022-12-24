
import DriverStandings from '../../src/cards/driver-standings';
import { createMock } from 'ts-auto-mock';
import { HomeAssistant } from 'custom-card-helpers';
import { getRenderString } from '../utils';
import { MRData } from '../testdata/driverStandings.json'
import { HassEntity } from 'home-assistant-js-websocket';
import { DriverStanding, FormulaOneCardConfig } from '../../src/types/formulaone-card-types';

describe('Testing driver-standings file', () => {
    const hass = createMock<HomeAssistant>();
    const data = MRData['StandingsTable']['StandingsLists'][0]['DriverStandings'];
    const hassEntity = createMock<HassEntity>();
    const config = createMock<FormulaOneCardConfig>();

    test('Calling render with hass and wrong sensor', () => { 
        hass.states = {
            'sensor.test_sensor_wrong_sensor': hassEntity
        };  

        const card = new DriverStandings('sensor.test_sensor_wrong_sensor', hass, config);
        expect(() => card.render()).toThrowError('Please pass the correct sensor (drivers)');
    }),
    test('Calling render with hass and sensor but no data', () => {   
        hassEntity.attributes['last_update'] = new Date();
        hass.states = {
            'sensor.test_sensor_drivers': hassEntity
        };

        const card = new DriverStandings('sensor.test_sensor_drivers', hass, config);
        expect(() => card.render()).toThrowError('Please pass the correct sensor (drivers)');
    }),
    test('Calling render with hass and sensor', () => {   
        hassEntity.attributes['data'] = data as DriverStanding[];
        hass.states = {
            'sensor.test_sensor_drivers': hassEntity
        };

        const card = new DriverStandings('sensor.test_sensor_drivers', hass, config);
        const result = card.render();
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<table> <thead> <tr> <th class="width-50" colspan="2">&nbsp;</th> <th>Driver</th> <th class="width-60 text-center">Pts</th> <th class="text-center">Wins</th> </tr> </thead> <tbody> <tr> <td class="width-40 text-center">1</td> <td>VER</td> <td>Max Verstappen</td> <td class="width-60 text-center">341</td> <td class="text-center">11</td> </tr> <tr> <td class="width-40 text-center">2</td> <td>LEC</td> <td>Charles Leclerc</td> <td class="width-60 text-center">237</td> <td class="text-center">3</td> </tr> <tr> <td class="width-40 text-center">3</td> <td>PER</td> <td>Sergio Pérez</td> <td class="width-60 text-center">235</td> <td class="text-center">2</td> </tr> <tr> <td class="width-40 text-center">4</td> <td>RUS</td> <td>George Russell</td> <td class="width-60 text-center">203</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">5</td> <td>SAI</td> <td>Carlos Sainz</td> <td class="width-60 text-center">202</td> <td class="text-center">1</td> </tr> <tr> <td class="width-40 text-center">6</td> <td>HAM</td> <td>Lewis Hamilton</td> <td class="width-60 text-center">170</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">7</td> <td>NOR</td> <td>Lando Norris</td> <td class="width-60 text-center">100</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">8</td> <td>OCO</td> <td>Esteban Ocon</td> <td class="width-60 text-center">66</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">9</td> <td>ALO</td> <td>Fernando Alonso</td> <td class="width-60 text-center">59</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">10</td> <td>BOT</td> <td>Valtteri Bottas</td> <td class="width-60 text-center">46</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">11</td> <td>RIC</td> <td>Daniel Ricciardo</td> <td class="width-60 text-center">29</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">12</td> <td>VET</td> <td>Sebastian Vettel</td> <td class="width-60 text-center">24</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">13</td> <td>GAS</td> <td>Pierre Gasly</td> <td class="width-60 text-center">23</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">14</td> <td>MAG</td> <td>Kevin Magnussen</td> <td class="width-60 text-center">22</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">15</td> <td>STR</td> <td>Lance Stroll</td> <td class="width-60 text-center">13</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">16</td> <td>MSC</td> <td>Mick Schumacher</td> <td class="width-60 text-center">12</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">17</td> <td>TSU</td> <td>Yuki Tsunoda</td> <td class="width-60 text-center">11</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">18</td> <td>ZHO</td> <td>Guanyu Zhou</td> <td class="width-60 text-center">6</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">19</td> <td>ALB</td> <td>Alexander Albon</td> <td class="width-60 text-center">4</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">20</td> <td>DEV</td> <td>Nyck de Vries</td> <td class="width-60 text-center">2</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">21</td> <td>LAT</td> <td>Nicholas Latifi</td> <td class="width-60 text-center">0</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">22</td> <td>HUL</td> <td>Nico Hülkenberg</td> <td class="width-60 text-center">0</td> <td class="text-center">0</td> </tr> </tbody> </table>');
    }),
    test('Calling render with hass and sensor and showing flag and team', () => {  
        config.standings = {
            show_flag: true,
            show_team: true
        } 
        hassEntity.attributes['data'] = data as DriverStanding[];
        hass.states = {
            'sensor.test_sensor_drivers': hassEntity
        };

        const card = new DriverStandings('sensor.test_sensor_drivers', hass, config);
        const result = card.render();
        const htmlResult = getRenderString(result);
        
        expect(htmlResult).toMatch('<table> <thead> <tr> <th class="width-50" colspan="2">&nbsp;</th> <th>Driver</th> <th>Team</th> <th class="width-60 text-center">Pts</th> <th class="text-center">Wins</th> </tr> </thead> <tbody> <tr> <td class="width-40 text-center">1</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Netherlands.png">&nbsp;VER</td> <td>Max Verstappen</td> <td>Red Bull</td> <td class="width-60 text-center">341</td> <td class="text-center">11</td> </tr> <tr> <td class="width-40 text-center">2</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Monaco.png">&nbsp;LEC</td> <td>Charles Leclerc</td> <td>Ferrari</td> <td class="width-60 text-center">237</td> <td class="text-center">3</td> </tr> <tr> <td class="width-40 text-center">3</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Mexico.png">&nbsp;PER</td> <td>Sergio Pérez</td> <td>Red Bull</td> <td class="width-60 text-center">235</td> <td class="text-center">2</td> </tr> <tr> <td class="width-40 text-center">4</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-United-Kingdom.png">&nbsp;RUS</td> <td>George Russell</td> <td>Mercedes</td> <td class="width-60 text-center">203</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">5</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Spain.png">&nbsp;SAI</td> <td>Carlos Sainz</td> <td>Ferrari</td> <td class="width-60 text-center">202</td> <td class="text-center">1</td> </tr> <tr> <td class="width-40 text-center">6</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-United-Kingdom.png">&nbsp;HAM</td> <td>Lewis Hamilton</td> <td>Mercedes</td> <td class="width-60 text-center">170</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">7</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-United-Kingdom.png">&nbsp;NOR</td> <td>Lando Norris</td> <td>McLaren</td> <td class="width-60 text-center">100</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">8</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-France.png">&nbsp;OCO</td> <td>Esteban Ocon</td> <td>Alpine F1 Team</td> <td class="width-60 text-center">66</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">9</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Spain.png">&nbsp;ALO</td> <td>Fernando Alonso</td> <td>Alpine F1 Team</td> <td class="width-60 text-center">59</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">10</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Finland.png">&nbsp;BOT</td> <td>Valtteri Bottas</td> <td>Alfa Romeo</td> <td class="width-60 text-center">46</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">11</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Australia.png">&nbsp;RIC</td> <td>Daniel Ricciardo</td> <td>McLaren</td> <td class="width-60 text-center">29</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">12</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Germany.png">&nbsp;VET</td> <td>Sebastian Vettel</td> <td>Aston Martin</td> <td class="width-60 text-center">24</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">13</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-France.png">&nbsp;GAS</td> <td>Pierre Gasly</td> <td>AlphaTauri</td> <td class="width-60 text-center">23</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">14</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Denmark.png">&nbsp;MAG</td> <td>Kevin Magnussen</td> <td>Haas F1 Team</td> <td class="width-60 text-center">22</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">15</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Canada.png">&nbsp;STR</td> <td>Lance Stroll</td> <td>Aston Martin</td> <td class="width-60 text-center">13</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">16</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Germany.png">&nbsp;MSC</td> <td>Mick Schumacher</td> <td>Haas F1 Team</td> <td class="width-60 text-center">12</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">17</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Japan.png">&nbsp;TSU</td> <td>Yuki Tsunoda</td> <td>AlphaTauri</td> <td class="width-60 text-center">11</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">18</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-China.png">&nbsp;ZHO</td> <td>Guanyu Zhou</td> <td>Alfa Romeo</td> <td class="width-60 text-center">6</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">19</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Thailand.png">&nbsp;ALB</td> <td>Alexander Albon</td> <td>Williams</td> <td class="width-60 text-center">4</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">20</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Netherlands.png">&nbsp;DEV</td> <td>Nyck de Vries</td> <td>Williams</td> <td class="width-60 text-center">2</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">21</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Canada.png">&nbsp;LAT</td> <td>Nicholas Latifi</td> <td>Williams</td> <td class="width-60 text-center">0</td> <td class="text-center">0</td> </tr> <tr> <td class="width-40 text-center">22</td> <td><img height="10" src="https://www.countries-ofthe-world.com/flags-normal/flag-of-Germany.png">&nbsp;HUL</td> <td>Nico Hülkenberg</td> <td>Aston Martin</td> <td class="width-60 text-center">0</td> <td class="text-center">0</td> </tr> </tbody> </table>');
    }),
    test('Calling cardSize with hass and sensor', () => { 
        
        hassEntity.attributes['data'] = data as DriverStanding[];
        hass.states = {
            'sensor.test_sensor_constructors': hassEntity
        };

        const card = new DriverStandings('sensor.test_sensor_constructors', hass, config);
        expect(card.cardSize()).toBe(12);
    }),
    test('Calling cardSize with hass and sensor without data', () => { 
        
        hassEntity.attributes['data'] = [];
        hass.states = {
            'sensor.test_sensor_constructors': hassEntity
        };

        const card = new DriverStandings('sensor.test_sensor_constructors', hass, config);
        expect(card.cardSize()).toBe(2);
    }),
    test('Calling cardSize with hass and sensor without data', () => { 
        
        hassEntity.attributes['data'] = undefined;
        hass.states = {
            'sensor.test_sensor_constructors': hassEntity
        };

        const card = new DriverStandings('sensor.test_sensor_constructors', hass, config);
        expect(card.cardSize()).toBe(2);
    })
});