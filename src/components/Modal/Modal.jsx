import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Popup({ open, toggleModal, children, trigger }) {

  return (
    <div>
      <div onClick={toggleModal}>{trigger}</div>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="md:w-auto w-11/12 absolute top-1/2 left-1/2 md:h-auto h-screen overflow-y-scroll">
          {children}
        </Box>
      </Modal>
    </div>
  );
}