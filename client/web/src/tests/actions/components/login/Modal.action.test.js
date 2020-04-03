
import {
  toggleModal,
  TOGGLE_MODAL
} from "../../../../actions/components/login/Modal.action";

describe("test modal actions", () => {
  it("test modal", async () => {
    let returnedValue = toggleModal(true);
    expect(returnedValue.type).toEqual(TOGGLE_MODAL);
    expect(returnedValue.payload).toEqual(true);

    returnedValue = toggleModal(false);
    expect(returnedValue.type).toEqual(TOGGLE_MODAL);
    expect(returnedValue.payload).toEqual(false);

    
  });
});
