import ReactGA from 'react-ga';

export default function Head({title}) {
  document.title = title;
  ReactGA.pageview(window.location.pathname + window.location.search);
  return null;
}