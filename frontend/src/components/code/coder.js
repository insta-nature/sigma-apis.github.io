export default { // eslint-disable-line

testURL: `http://sigma.ai`,

testApiWithcommand: `'http://sigma.ai/api/service/key='DemoKey'&command='open Website google.com''`,

snapetCode: 
`'use strict';
waApi.getFull('sin(x)').then((queryresult) => {
  const pods = queryresult.pods;
  const output = pods.map((pod) => {
    const subpodContent = pod.subpods.map(subpod =>
       <img src="$ {subpod.img.src}" alt="$ {subpod.img.alt}">
    ).join('\n');
    return (<h2>$ {pod.title}</h2>\n$ {subpodContent});
  }).join('\n');
  console.log(output);
}).catch(console.error);`,

singleQury:
`waApi.getFull('sin x').then(console.log).catch(console.error);
// { success: true, error: false, numpods: 13, datatypes: '', ...
`,
singleQury1:
`waApi.getFull('F9TVlu5AmVzL').then(console.log).catch(console.error);
// { success: false, error: false, numpods: 0, datatypes: '', ...
`,

JsonData: 
`{
  "Meta Data": {
      "1. Information": "Daily Prices (open, high, low, close) and Volumes",
      "2. Symbol": "IBM",
      "3. Last Refreshed": "2022-08-12",
      "4. Output Size": "Compact",
      "5. Time Zone": "US/Eastern"
  }
}`,

}