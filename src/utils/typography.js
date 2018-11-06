import Typography from 'typography';
// import bootstrapTheme from 'typography-theme-bootstrap';
// import lawtonTheme from 'typography-theme-lawton';
import kirkham from 'typography-theme-kirkham';

const typography = new Typography(kirkham);

export default typography;

export const rhythm = typography.rhythm;
