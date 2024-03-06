import { Alert, Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { selectedListingState } from "../../atoms/listingAtoms";
import { IListing } from "../../interfaces/ListingInterface";
import ListingServices from "../../services/ListingService";

type Props = {
  listing: IListing;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

function DeleteListing({ listing, openModal, setOpenModal }: Readonly<Props>) {
  const [alert, setAlert] = useState(false);
  const setSelectedListing = useSetRecoilState(selectedListingState);

  const deleteListing = async () => {
    await ListingServices.DeleteListing(listing._id).then(() => {
      setAlert(true);
      setSelectedListing({} as IListing);
    });
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        <label className="text-xl font-semibold">Delete {listing.title}</label>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm text-white">
          Are you sure you want to delete {listing.title}?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="red"
          onClick={() => {
            deleteListing();
          }}
          disabled={alert}
        >
          Delete
        </Button>
        <Button
          color="gray"
          onClick={() => setOpenModal(false)}
          disabled={alert}
        >
          Cancel
        </Button>
      </Modal.Footer>
      {alert && (
        <Alert
          color="success"
          className="mx-4"
          onDismiss={() => {
            setAlert(false);
            setOpenModal(false);
          }}
        >
          Listing deleted successfully
        </Alert>
      )}
    </Modal>
  );
}

export default DeleteListing;
