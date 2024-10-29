document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('transaction-form');
    const transactionsBody = document.getElementById('transactions-body');
    //const submitBtn = document.querySelector('.submit-btn');
    const cancelBtn = document.querySelector('.cancel-btn');

    // Initialize transactions array
    let transactions = [];

    // LocalStorage management
    const storageKey = 'financeTrackerTransactions';

    // Storage utility functions
    const storage = {
        save: function(transactions) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(transactions));
                return true;
            } catch (e) {
                console.error('Error saving to localStorage:', e);
                showErrors({ storage: 'Failed to save transactions.' });
                return false;
            }
        },

        load: function() {
            try {
                const stored = localStorage.getItem(storageKey);
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                console.error('Error loading from localStorage:', e);
                showErrors({ storage: 'Failed to load transactions.' });
                return [];
            }
        }
    };

    // Load saved transactions
    transactions = storage.load();

    // Initialize page
    setDefaultDate();
    updateTable();
    updateSummary();

    // Set up error container
    let errorContainer = document.querySelector('.error-container');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        form.insertBefore(errorContainer, form.firstChild);
    }

    // Validation rules
    const validators = {
        date: {
            validate: (value) => {
                if (!value) return 'Date is required';
                const inputDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (inputDate > today) return 'Date cannot be in the future';
                return null;
            }
        },
        type: {
            validate: (value) => {
                const validTypes = ['income', 'expense'];
                if (!validTypes.includes(value)) return 'Please select a valid transaction type';
                return null;
            }
        },
        category: {
            validate: (value) => {
                const validCategories = ['food', 'rent', 'entertainment', 'salary', 'other'];
                if (!validCategories.includes(value)) return 'Please select a valid category';
                return null;
            }
        },
        amount: {
            validate: (value) => {
                if (!value || value === '') return 'Amount is required';
                if (isNaN(value) || parseFloat(value) <= 0) return 'Amount must be a positive number';
                if (value.toString().split('.')[1]?.length > 2) return 'Amount cannot have more than 2 decimal places';
                return null;
            }
        }
    };

    // Event Listeners
    form.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', resetForm);

    // Form submission handler
    function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            date: document.getElementById('date').value,
            type: document.getElementById('type').value,
            category: document.getElementById('category').value,
            amount: document.getElementById('amount').value
        };

        // Validate form data
        const errors = validateFormData(formData);
        if (Object.keys(errors).length > 0) {
            showErrors(errors);
            return;
        }

        // Create new transaction
        const transaction = {
            id: Date.now(),
            date: formData.date,
            type: formData.type,
            category: formData.category,
            amount: parseFloat(formData.amount)
        };

        // Add transaction and update display
        transactions.push(transaction);
        if (storage.save(transactions)) {
            updateTable();
            updateSummary();
            resetForm();
            showSuccessMessage('Transaction added successfully!');
        }
    }

    function validateFormData(formData) {
        const errors = {};
        Object.keys(validators).forEach(field => {
            const error = validators[field].validate(formData[field]);
            if (error) errors[field] = error;
        });
        return errors;
    }

    function updateTable() {
        transactionsBody.innerHTML = '';
        const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedTransactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(transaction.date)}</td>
                <td>${capitalizeFirst(transaction.type)}</td>
                <td>${capitalizeFirst(transaction.category)}</td>
                <td class="${transaction.type}-amount">
                    ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
                </td>
                <td>
                    <button onclick="deleteTransaction(${transaction.id})" class="delete-btn">Remove</button>
                </td>
            `;
            transactionsBody.appendChild(row);
        });
    }

    function updateSummary() {
        const summaryContainer = document.getElementById('summary-container');
        const summary = transactions.reduce((acc, curr) => {
            if (curr.type === 'income') {
                acc.totalIncome += curr.amount;
            } else {
                acc.totalExpenses += curr.amount;
            }
            return acc;
        }, { totalIncome: 0, totalExpenses: 0 });

        const balance = summary.totalIncome - summary.totalExpenses;

        summaryContainer.innerHTML = `
            <div class="summary-item">
                <h3>Total Income</h3>
                <p class="income-amount">$${summary.totalIncome.toFixed(2)}</p>
            </div>
            <div class="summary-item">
                <h3>Total Expenses</h3>
                <p class="expense-amount">$${summary.totalExpenses.toFixed(2)}</p>
            </div>
            <div class="summary-item">
                <h3>Balance</h3>
                <p class="${balance >= 0 ? 'income-amount' : 'expense-amount'}">
                    $${balance.toFixed(2)}
                </p>
            </div>
        `;
    }

    // Utility functions
    function setDefaultDate() {
        let d = new Date();
        d.setDate(d.getDate() - 1);
        document.getElementById('date').valueAsDate = d;
        //document.getElementById('date').valueAsDate = new Date();
    }

    function resetForm() {
        form.reset();
        setDefaultDate();
        errorContainer.innerHTML = '';

        const cancelMessage = document.createElement('div');
        cancelMessage.className = 'info-message';
        cancelMessage.textContent = 'Form has been reset';
        errorContainer.appendChild(cancelMessage);

        setTimeout(() => {
            cancelMessage.remove();
        }, 2000);
    }

    function showErrors(errors) {
        errorContainer.innerHTML = '';
        if (Object.keys(errors).length > 0) {
            const errorList = document.createElement('ul');
            errorList.className = 'error-list';

            Object.values(errors).forEach(error => {
                if (error) {
                    const errorItem = document.createElement('li');
                    errorItem.textContent = error;
                    errorList.appendChild(errorItem);
                }
            });

            errorContainer.appendChild(errorList);
        }
    }

    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        errorContainer.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    function capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Add delete function to window scope
    window.deleteTransaction = function(id) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            transactions = transactions.filter(t => t.id !== id);
            if (storage.save(transactions)) {
                updateTable();
                updateSummary();
                showSuccessMessage('Transaction deleted successfully!');
            }
        }
    };
});
