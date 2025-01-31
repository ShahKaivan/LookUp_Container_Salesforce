import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/** Apex methods from SampleLookupController */
import search from '@salesforce/apex/SampleLookupController.search';
import getRecentlyViewed from '@salesforce/apex/SampleLookupController.getRecentlyViewed';

export default class SampleLookupContainer extends LightningElement {
    //Alerts are used instead of toasts (LEX only) to notify user
    @api notifyViaAlerts = false;

    isMultiEntry = false;
    maxSelectionSize = 2;
    initialSelection = [
        {
            id: 'na',
            sObjectType: 'na',
            icon: 'standard:lightning_component',
            title: 'Initial selection',
            subtitle: 'Not a valid record'
        }
    ];
    errors = [];
    recentlyViewed = [];
    newRecordOptions = [
        { value: 'Account', label: 'New Account' },
        { value: 'Opportunity', label: 'New Opportunity' }
    ];

    /**
     * Loads recently viewed records and set them as default lookup search results (optional)
     */
    @wire(getRecentlyViewed)
    getRecentlyViewed({ data }) {
        if (data) {
            this.recentlyViewed = data;
            this.initLookupDefaultResults();
        }
    }

    connectedCallback() {
        this.initLookupDefaultResults();
    }

    /**
     * Initializes the lookup default results with a list of recently viewed records (optional)
     */
    initLookupDefaultResults() {
        
        const lookup = this.template.querySelector('c-lookup');
        if (lookup) {
            lookup.setDefaultResults(this.recentlyViewed);
        }
    }

    /**
     * Handles the lookup search event.
     * Calls the server to perform the search and returns the results to the lookup.
     * @param {event} event `search` event emitted by the lookup
     */
    async handleLookupSearch(event) {
        const lookupElement = event.target;
        // Call Apex endpoint to search for records and pass results to the lookup
        try {
            const results = await search(event.detail);
            lookupElement.setSearchResults(results);
        } catch (error) {
            this.notifyUser('Lookup Error', 'An error occurred while searching with the lookup field.', 'error');
            // eslint-disable-next-line no-console
            console.error('Lookup error', JSON.stringify(error));
            this.errors = [error];
        }
    }

    /**
     * Handles the lookup selection change
     * @param {event} event `selectionchange` event emitted by the lookup.
     * The event contains the list of selected ids.
     */
    // eslint-disable-next-line no-unused-vars
    handleLookupSelectionChange(event) {
        this.checkForErrors();
    }

    // All functions below are part of the sample app form (not required by the lookup).

    handleLookupTypeChange(event) {
        this.initialSelection = [];
        this.errors = [];
        this.isMultiEntry = event.target.checked;
    }

    handleMaxSelectionSizeChange(event) {
        this.maxSelectionSize = event.target.value;
    }

    handleSubmit() {
        this.checkForErrors();
        if (this.errors.length === 0) {
            this.notifyUser('Success', 'The form was submitted.', 'success');
        }
    }

    handleClear() {
        this.initialSelection = [];
        this.errors = [];
    }

    handleFocus() {
        this.template.querySelector('c-lookup').focus();
    }

    checkForErrors() {
        this.errors = [];
        const selection = this.template.querySelector('c-lookup').getSelection();
        // Custom validation rule
        if (this.isMultiEntry && selection.length > this.maxSelectionSize) {
            this.errors.push({ message: `You may only select up to ${this.maxSelectionSize} items.` });
        }
        // Enforcing required field
        if (selection.length === 0) {
            this.errors.push({ message: 'Please make a selection.' });
        }
    }

    notifyUser(title, message, variant) {
        if (this.notifyViaAlerts) {
            // Notify via alert
            // eslint-disable-next-line no-alert
            alert(`${title}\n${message}`);
        } else {
            // Notify via toast (only works in LEX)
            const toastEvent = new ShowToastEvent({ title, message, variant });
            this.dispatchEvent(toastEvent);
        }
    }
}