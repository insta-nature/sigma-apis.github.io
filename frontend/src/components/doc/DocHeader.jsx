import Button from "@mui/material/Button";
import "../../styles/doc/doc.scss";

export const DocHeader = () => {
    // eslint-disable-next-line
    const register = () =>{ register = window.location.href = '/register' };
    // eslint-disable-next-line
    const contact = () => { contact = window.location.href = '/contact'};
    // eslint-disable-next-line
    const exploreApi = () => { exploreApi = window.location.href = 'speechrecon'};
    // eslint-disable-next-line
    const languageLib = () => { languageLib = window.location.href = ''};

    return(
    <div>
        <h1>
            <span className="label marg">
            <img height={50} width={50}  src="https://products.wolframalpha.com/simple-api/icon.svg" alt="" />
            </span>
            <span className="label">
            <span className="line">
                SIGMA | Simple API
                <span className="italic"> Reference</span>
            </span>
            </span>
        </h1>
        <p className="lead">
            The SIGMA Full Results API provides a web-based API allowing the computational and presentation capabilities of 
            SIGMA to be integrated into web, mobile, desktop and also enterprise applications devloped.
        </p>
        <p>Built on the same technology as the Full Results API, the Simple API generates full SIGMA output in a 
            universally viewable image format. This API makes it easy to translate free-form linguistic queries into in-depth, 
            formatted results for users with little coding effort. It is implemented in a standard REST protocol using HTTP GET requests.</p>
        <p>The API allows clients to submit free-form queries similar to the queries one might enter at the SIGMA website, and for the computed results 
            to be returned in a variety of formats. It is implemented in a standard REST protocol using HTTP GET requests. Each result is returned as a 
            descriptive JSON structure wrapping the requested content format.</p>
        <p className="note">Note: The Simple API does not support disambiguation, drilldown or asynchronous results delivery; it returns only a single, static image. 
            For these advanced features, use the Full Results API.</p>
        <br />
        <p >
            <Button className="button" 
                type="submit"
                onClick={register}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            > Get Started </Button>
            <Button className="button"
                type="submit"
                onClick={contact}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            > Contact Us </Button>
            <Button className="button" 
                type="submit"
                onClick={exploreApi}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            > API Explorer </Button>
            <Button className="button"
                type="submit"
                onClick={languageLib}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            > Language Libraries </Button>
        </p>
    </div>
    );
};