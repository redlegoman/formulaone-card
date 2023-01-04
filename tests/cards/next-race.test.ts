import NextRace from '../../src/cards/next-race';
import { createMock } from 'ts-auto-mock';
import { HomeAssistant, NumberFormat, TimeFormat } from 'custom-card-helpers';
import { getRenderString } from '../utils';
import { MRData } from '../testdata/schedule.json'
import { FormulaOneCardConfig } from '../../src/types/formulaone-card-types';
import { Race } from '../../src/api/models';

describe('Testing next-race file', () => {
    const hass = createMock<HomeAssistant>();
    hass.locale = {
        language: 'NL', 
        number_format: NumberFormat.comma_decimal,
        time_format: TimeFormat.language
    }
    
    const config = createMock<FormulaOneCardConfig>();
    const data = <Race>MRData['RaceTable'].Races[0];

    test('Calling render with hass and wrong sensor', () => { 
        const card = new NextRace(hass, config);
        expect(() => card.render()).toThrowError('Please pass the correct sensor (races)');
    }),
    test('Calling render with hass and sensor but no data', () => {   
        const card = new NextRace(hass, config);
        expect(() => card.render()).toThrowError('Please pass the correct sensor (races)');
    }),
    test('Calling render with hass and sensor', () => {   
        const card = new NextRace(hass, config);
        const result = card.render();
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<table> <tbody> <tr> <td colspan="5"><h2><img height="25" src="https://flagcdn.com/w40/bh.png">&nbsp; 1 : Bahrain Grand Prix</h2><img width="100%" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/7col/image.png"><br> </td> </tr> <tr><td>Date</td><td>20-03-22</td><td>&nbsp;</td><td>Practice 1</td><td align="right">vr 13:00</td></tr> <tr><td>Race</td><td>1</td><td>&nbsp;</td><td>Practice 2</td><td align="right">vr 16:00</td></tr> <tr><td>Race name</td><td>Bahrain Grand Prix</td><td>&nbsp;</td><td>Practice 3</td><td align="right">za 13:00</td></tr> <tr><td>Circuit name</td><td>Bahrain International Circuit</td><td>&nbsp;</td><td>Qualifying</td><td align="right">za 16:00</td></tr> <tr><td>Location</td><td>Bahrain</td><td>&nbsp;</td><td>Sprint</td><td align="right">-</td></tr> <tr><td>City</td><td>Sakhir</td><td>&nbsp;</td><td>Race</td><td align="right">zo 16:00</td></tr> </tbody> </table>');
    }),
    test('Calling renderHeader with hass and wrong sensor', () => { 
        config.image_clickable = undefined;

        const card = new NextRace(hass, config);
        
        const result = card.renderHeader(data);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<h2><img height="25" src="https://flagcdn.com/w40/bh.png">&nbsp; 1 : Bahrain Grand Prix</h2><img width="100%" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/7col/image.png"><br>');
    }),
    test('Calling renderHeader clickable image with hass and wrong sensor', () => { 
        config.image_clickable = true;

        const card = new NextRace(hass, config);
        
        const result = card.renderHeader(data);
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<h2><img height="25" src="https://flagcdn.com/w40/bh.png">&nbsp; 1 : Bahrain Grand Prix</h2><a target="_new" href="http://en.wikipedia.org/wiki/Bahrain_International_Circuit"><img width="100%" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/7col/image.png"></a><br>');
    }),
    test('Calling render without Qualifying with hass and sensor', () => {   
        const raceData = data as Race;
        raceData.Qualifying = undefined;
        
        const card = new NextRace(hass, config);
        const result = card.render();
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<table> <tbody> <tr> <td colspan="5"><h2><img height="25" src="https://flagcdn.com/w40/bh.png">&nbsp; 1 : Bahrain Grand Prix</h2><a target="_new" href="http://en.wikipedia.org/wiki/Bahrain_International_Circuit"><img width="100%" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/7col/image.png"></a><br> </td> </tr> <tr><td>Date</td><td>20-03-22</td><td>&nbsp;</td><td>Practice 1</td><td align="right">vr 13:00</td></tr> <tr><td>Race</td><td>1</td><td>&nbsp;</td><td>Practice 2</td><td align="right">vr 16:00</td></tr> <tr><td>Race name</td><td>Bahrain Grand Prix</td><td>&nbsp;</td><td>Practice 3</td><td align="right">za 13:00</td></tr> <tr><td>Circuit name</td><td>Bahrain International Circuit</td><td>&nbsp;</td><td>Qualifying</td><td align="right">-</td></tr> <tr><td>Location</td><td>Bahrain</td><td>&nbsp;</td><td>Sprint</td><td align="right">-</td></tr> <tr><td>City</td><td>Sakhir</td><td>&nbsp;</td><td>Race</td><td align="right">zo 16:00</td></tr> </tbody> </table>');
    }),
    test('Calling render with Sprint with hass and sensor', () => {   
        const raceData = data as Race;
        raceData.ThirdPractice = undefined;
        raceData.Sprint = {
            date: '2022-03-20',
            time: '10:00'
        };

        const card = new NextRace(hass, config);
        const result = card.render();
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<table> <tbody> <tr> <td colspan="5"><h2><img height="25" src="https://flagcdn.com/w40/bh.png">&nbsp; 1 : Bahrain Grand Prix</h2><a target="_new" href="http://en.wikipedia.org/wiki/Bahrain_International_Circuit"><img width="100%" src="https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/7col/image.png"></a><br> </td> </tr> <tr><td>Date</td><td>20-03-22</td><td>&nbsp;</td><td>Practice 1</td><td align="right">vr 13:00</td></tr> <tr><td>Race</td><td>1</td><td>&nbsp;</td><td>Practice 2</td><td align="right">vr 16:00</td></tr> <tr><td>Race name</td><td>Bahrain Grand Prix</td><td>&nbsp;</td><td>Practice 3</td><td align="right">-</td></tr> <tr><td>Circuit name</td><td>Bahrain International Circuit</td><td>&nbsp;</td><td>Qualifying</td><td align="right">-</td></tr> <tr><td>Location</td><td>Bahrain</td><td>&nbsp;</td><td>Sprint</td><td align="right">zo 10:00</td></tr> <tr><td>City</td><td>Sakhir</td><td>&nbsp;</td><td>Race</td><td align="right">zo 16:00</td></tr> </tbody> </table>');
    }),
    test('Calling render with hass and sensor when season ended', () => {  
        const card = new NextRace(hass, config);
        const result = card.render();
        const htmlResult = getRenderString(result);

        expect(htmlResult).toMatch('<table><tr><td class="text-center"><strong>Season is over. See you next year!</strong></td></tr></table>');
    }),
    test('Calling cardSize with hass and sensor', () => { 
        const card = new NextRace(hass, config);
        expect(card.cardSize()).toBe(8);
    }),
    test('Calling cardSize with hass and sensor without data', () => { 
        const card = new NextRace(hass, config);
        expect(card.cardSize()).toBe(2);
    })
});