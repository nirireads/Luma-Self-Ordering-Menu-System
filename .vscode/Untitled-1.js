
import ErrorDialog from "../../components/errorDialog";

const [error, setError] = useState(null);

  const handleError = (message) => {
    setError(message);
  };

  const closeErrorDialog = () => {
    setError(null);
  };





  handleError("Server Error. Failed to Add Order.");



  
  {error && <ErrorDialog message={error} onClose={closeErrorDialog} />}




  // for yes no dialog box

  // >> inSIDE THE FUNCTION
  {confirmationData.show && (
    <ConfirmationDialog
      message={
        confirmationData.action === 'delete'
          ? 'Are you sure you want to delete this order?'
          : 'Are you sure you want to confirm this order?'
      }
      onConfirm={handleOrderAction}
      onCancel={handleConfirmationClose}/>
      )}