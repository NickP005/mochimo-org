
import { Container } from '@mui/material';

const iFrameResize = window.iFrameResize;

export default function Status () {
  return (
    <Container sx={{ position: 'relative', padding: 2 }}>
      <iframe
        title='embedded services status and uptime monitor'
        className='htframe' width='100%' style={{ border: 'none' }}
        src='https://wl.hetrixtools.com/r/b41a90593288f05a8dfb15f3af2863bf/'
        sandbox='allow-scripts allow-same-origin allow-popups'
        onLoad={() => iFrameResize([{ log: false }], '.htframe')}
      />
    </Container>
  );
}
