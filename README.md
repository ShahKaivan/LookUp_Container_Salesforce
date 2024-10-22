# Custom Lookup Component in Salesforce using LWC

## Overview
This project implements a **Custom Lookup Component** using **Lightning Web Components (LWC)** in **Salesforce**. The component allows users to efficiently search, select, and manage Salesforce records. It enhances the lookup functionality with features such as dynamic search, customizable display, and multi-object support. This solution is designed to improve the sales and CRM processes by providing an intuitive and responsive user interface for interacting with Salesforce data.

## Features
- **Dynamic Search**: Real-time searching of records across Salesforce objects.
- **Multi-Object Lookup**: Supports searching across multiple objects like Accounts, Contacts, and Opportunities.
- **Reusable Component**: Can be reused across different Salesforce objects or applications.
- **Customizable**: Easily customized to fit different business requirements.
- **Error Handling**: Built-in mechanisms for handling errors and ensuring a smooth user experience.
- **Recently Viewed Records**: Displays a list of recently viewed records for faster selection.

## Technology Stack
- **Lightning Web Components (LWC)**: Modern web development framework for building UI in Salesforce.
- **Apex**: Server-side code used for business logic and integrating with Salesforce's backend.
- **SOQL (Salesforce Object Query Language)**: Used to query data from Salesforce objects.
- **Salesforce API**: Integrates the component with Salesforce backend for fetching data dynamically.
- **Salesforce CRM**: The Salesforce platform where the component is used to enhance sales and service workflows.

## Architecture
1. **Presentation Layer**: LWC-based UI component for user interaction.
2. **Business Logic Layer**: Apex classes handle data retrieval, record searching, and processing logic.
3. **Data Access Layer**: Uses SOQL to fetch data from Salesforce objects and ensure optimized query performance.
4. **Database Layer**: Salesforce objects (Accounts, Contacts, etc.) where records are stored.

## Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/custom-lookup-lwc.git
    ```
2. **Deploy to Salesforce**:
   - Use Salesforce CLI or your preferred deployment tool to push the LWC and Apex classes into your Salesforce org.
   - Example:
     ```bash
     sfdx force:source:push
     ```
3. **Assign Permissions**:
   - Ensure the appropriate permissions are set for the users accessing the component.

## Usage
1. **Add the Lookup Component**:
   - Include the `<c-lookup>` component in your Lightning pages or Salesforce apps where needed.
   - For example:
     ```html
     <c-lookup
       selection={initialSelection}
       label="Search Accounts"
       onsearch={handleLookupSearch}
       is-multi-entry={isMultiEntry}
     ></c-lookup>
     ```
   
2. **Configure Apex Backend**:
   - Implement the Apex class to handle lookup logic (such as `getRecentlyViewed` or `search`) as per your use case.
   
3. **Customize**:
   - Customize the component as needed by modifying the Apex or LWC code to fit your specific object and field requirements.
