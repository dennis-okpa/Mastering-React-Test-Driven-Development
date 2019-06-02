import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from "./domManipulators";
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
    let render, container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    const form = id => container.querySelector(`form[id="${id}"]`);

    const field = name => form('customer').elements[name];

    const expectToBeInputFieldOfTypeText = formElement => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    }

    const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
    
    const itRendersAsATextBox = (fieldName) => {
        it('renders as a text box', () => {
            render(<CustomerForm />);
            expectToBeInputFieldOfTypeText(field(fieldName));
        });
    }
    
    const itIncludesTheExistingValue = (fieldName) => {
        it('includes the existing value', () => {
            render(<CustomerForm { ...{[fieldName]: 'value'}} />);
            expect(field(fieldName).value).toEqual('value');
        });
    };
    
    const itRendersALabel = (fieldName, label) => {
        it('renders a label', () => {
            render(<CustomerForm />);
            expect(labelFor(fieldName).textContent).toEqual(label);
        });
    };
    
    const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
        it('assigns an id that matches the label id', () => {
            render(<CustomerForm />);
            expect(field(fieldName).id).toEqual(fieldName);
        });
    };
    
    const itSavesExistingValueWhenSubmitted = (fieldName) => {
        it('saves existing value when submitted', async () => {
            expect.hasAssertions();
            render(<CustomerForm
                { ...{[fieldName]: 'value'} }
                onSubmit={(formFields) => {
                    expect(formFields[fieldName]).toEqual('value');
                }
            } />);
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    }

    const itSavesNewValueWhenSubmitted = (fieldName, value) => {
        it('saves new value when submitted', async () => {
            expect.hasAssertions();
            render(
                <CustomerForm 
                    { ...{[fieldName]: 'existingValue'} }
                    onSubmit={(formFields) => 
                        expect(formFields[fieldName]).toEqual(value)
                    }
                />
            );
            await ReactTestUtils.Simulate.change( field(fieldName), {
                target: { value, name: fieldName }
            });
            await ReactTestUtils.Simulate.submit(form('customer'));
        });
    };

    describe('first name field', () => {
        const fieldName = 'firstName';
        itRendersAsATextBox(fieldName);
        itIncludesTheExistingValue(fieldName);
        itRendersALabel(fieldName, 'First name');
        itAssignsAnIdThatMatchesTheLabelId(fieldName);
        itSavesExistingValueWhenSubmitted(fieldName);
        itSavesNewValueWhenSubmitted(fieldName, 'newValue');
    });

    describe('last name field', () => {
        const fieldName = 'lastName';
        itRendersAsATextBox(fieldName);
        itIncludesTheExistingValue(fieldName);
        itRendersALabel(fieldName, 'Last name');
        itAssignsAnIdThatMatchesTheLabelId(fieldName);
        itSavesExistingValueWhenSubmitted(fieldName);
        itSavesNewValueWhenSubmitted(fieldName, 'newValue');
    });

    describe('phone number field', () => {
        const fieldName = 'phoneNumber';
        itRendersAsATextBox(fieldName);
        itIncludesTheExistingValue(fieldName);
        itRendersALabel(fieldName, 'Phone number');
        itAssignsAnIdThatMatchesTheLabelId(fieldName);
        itSavesExistingValueWhenSubmitted(fieldName);
        itSavesNewValueWhenSubmitted(fieldName, '626474');
    });

    it('has a submit button', () => {
        render(<CustomerForm />);
        const submitButton = container.querySelector(
            'input[type="submit"]'
        );
        expect(submitButton).not.toBeNull();
    });
});