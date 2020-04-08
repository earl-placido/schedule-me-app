import React from "react";
import { Input } from "antd";
import GroupCodeModal from "../../components/GroupCodeModal";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<GroupCodeModal.WrappedComponent {...props} />);
  return component;
};

describe("Testing GroupCodeModal", () => {
  let component, props;
  beforeEach(() => {
    props = {
      resetState: jest.fn(),
      setCode: jest.fn(),
      addUserToGroup: jest.fn(),
      success: false, 
      code: "1234"
    };
    component = setUp(props);
  });

  it("tests if component renders", () => {
    expect(component.length).toEqual(1);
    component.instance().componentWillUnmount();
    expect(props.resetState.mock.calls.length).toBe(1);
    console.log(component.debug())
  });

  it("tests functions", () =>{
    const handleChangeSpy = jest.spyOn(component.instance(), "handleChange");
    const onEnterSpy = jest.spyOn(component.instance(), "onEnter");
    component.instance().handleChange("test");
    component.instance().onEnter();
    expect(props.setCode.mock.calls.length).toBe(1);
    expect(props.addUserToGroup.mock.calls.length).toBe(1);
    expect(handleChangeSpy).toBeCalled();
    expect(onEnterSpy).toBeCalled();
  });

  it("tests Input component", () => {
    expect(component.find(Input)).toHaveLength(1);
    component.find(Input).simulate('change', {
      target: {
        value: "test"
      }
    });
    expect(props.setCode.mock.calls.length).toBe(1);
  });
});

it("Test if join message displays", () => {
  const props = {
    resetState: jest.fn(),
    success: true
  };
  let component = setUp(props);
  expect(component.find("#join-message")).toHaveLength(1);;
});


