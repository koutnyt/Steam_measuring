import { JSDOM } from 'jsdom';
import { StorageAdapter, DataStorageManager } from "../src/dataRepository";

describe('StorageAdapter.jsDomdDataToJSON', () => {
  it('Should read the text content of a DOM element of downloaded webpage and parses it to a JSON Data structure for thingspeak.', () => {
    const storageAdapter = new StorageAdapter(new DataStorageManager());
    const mockDate = new Date('2024-02-14T12:00:00Z');
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    expect(storageAdapter.jsDomdDataToJSON(testDomData)).toEqual(result);

    spy.mockRestore();
  });
});

const testDomData:JSDOM = new JSDOM(`<body>
<table class="navext"><tr><td width="50%" class="a l"><a href="web?refresh=120">AutoRefresh</a></td><td width="50%" class="b r"><a href="web">Refresh</a></td></tr></table><table class="headdev">
<tr><td width="95%">Ecograph T: Unit 1</td><td width="5%">&nbsp;</td></tr></table>
<p>&nbsp;</p>
<table class="time"><tr><td width="40%" class="b"><font class="footer">Current Time: 20240212-063159</font></td><td width="30%" class="center"><font class="footer"></font></td><td width="30%" align="right" class="b"><font class="footer">&nbsp;</font></td></tr></table>
<p>&nbsp;</p>
<table class="over">
<tr class="title">
<th width="40%"><font class="tbhead">Tag</font></th>
<th width="40%"><font class="tbhead">Actual Value</font><br><font class="pvtime">yyyymmdd-hhmmss</font></th>
<th width="20%"><font class="tbhead">Devicestatus/Limit</font><br><font class="pvtime"></font></th>
</tr>
<tr class="line0"><td  class="left"><font class="tagname">KONTI </font></td>
<td class="center"><font class="pv">1351,7 KW</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><font class="green">&nbsp;OK&nbsp;</td><tr class="line1"><td  class="left"><font class="tagname">JML </font></td>
<td class="center"><font class="pv">1894,6 KW</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><font class="green">&nbsp;OK&nbsp;</td><tr class="line0"><td  class="left"><font class="tagname">DLM </font></td>
<td class="center"><font class="pv">- - - - KW</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"></td>
<tr class="line1"><td  class="left"><font class="tagname">KONTI S (interm. counter)</font></td>
<td class="center"><font class="pv">10,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line0"><td  class="left"><font class="tagname">KONTI S (daily counter)</font></td>
<td class="center"><font class="pv">7945,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line1"><td  class="left"><font class="tagname">KONTI S (monthly counter)</font></td>
<td class="center"><font class="pv">319974,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line0"><td  class="left"><font class="tagname">KONTI S (total/yearly counter)</font></td>
<td class="center"><font class="pv">1169110,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line1"><td  class="left"><font class="tagname">JML S (interm. counter)</font></td>
<td class="center"><font class="pv">15,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line0"><td  class="left"><font class="tagname">JML S (daily counter)</font></td>
<td class="center"><font class="pv">4980,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line1"><td  class="left"><font class="tagname">JML S (monthly counter)</font></td>
<td class="center"><font class="pv">302300,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line0"><td  class="left"><font class="tagname">JML S (total/yearly counter)</font></td>
<td class="center"><font class="pv">1246374,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line1"><td  class="left"><font class="tagname">DLM S (interm. counter)</font></td>
<td class="center"><font class="pv">0,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line0"><td  class="left"><font class="tagname">DLM S (daily counter)</font></td>
<td class="center"><font class="pv">0,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line1"><td  class="left"><font class="tagname">DLM S (monthly counter)</font></td>
<td class="center"><font class="pv">0,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"><tr class="line0"><td  class="left"><font class="tagname">DLM S (total/yearly counter)</font></td>
<td class="center"><font class="pv">0,0 kWhod</font><br><font class="pvtime">20240212-062728</font></td>
<td class="center"></table>
<p>&nbsp;</p>
</body>
`)

const result = {
  write_api_key: process.env.WRITE_API_KEY as string,
  updates: [
    {
      created_at: new Date('2024-02-14T12:00:00Z'),
      field1: 1351.7,
      field2: 1894.6,
      field3: NaN,
      field4: 0,
      field5: 0,
      field6: 319974.0,
      field7: 302300.0,
      field8: 0
    }
  ]
}



