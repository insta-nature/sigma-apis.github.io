export const ApiUse = () => {
  const domain= `http://api.sigma.ai`
  const path = `/api/service`
  const api_key = `?key=DEMO`
  const command = `command='open website google.com'`

    return(
    <div>
        <span className="heading">Using the Simple API</span><br/>
        <span className="sub-heading">Sample Query</span>
        <p>Now that you have an AppID, you can make your first query. The base URL for queries is:</p>
        <code>
            <pre className="well">{domain + path}</pre>
        </code>
        <p>Every query requires two pieces of information—an AppID and an input value—in order to be processed
            correctly. The appid parameter tells your query which AppID to use:</p>
        <code>
            <pre className="well withmark">{domain+path}<mark>{api_key}</mark></pre>
        </code>
        <p>Next, use the i parameter to specify the URL-encoded input for your query. For instance, here is a query
            for "What airplanes are flying overhead?":</p>
        <code>
            <pre className="well withmark">{domain + path + api_key}<wbr/><mark>&amp;{command}</mark></pre>
        </code>
        <span className="sub-heading">URL Parameters and Options</span>
        <p>You can add URL-encoded parameters to customize output. Since its output often includes a mix of text, images and layout elements, the Simple API will accept a number of parameters, listed below.</p>
        <h4 className="param">API KEY</h4>
        <p>For API types that return full Wolfram|Alpha output, the layout parameter defines how content is presented. The default setting is divider (shown in previous queries), which specifies a series of pods with horizontal dividers. 
        The other option, labelbar, specifies a series of separate content sections with label bar headings:</p>
        <code>
        <pre className="well withmark">{domain+path}<mark>{api_key}</mark></pre>
        </code>
        <h4 className="param">Command</h4>
        <p>command Document.</p>
        <code>
        <pre className="well withmark">{domain + path + api_key}<wbr/><mark>&amp;{command}</mark></pre>
        </code>
    </div>
    );
}