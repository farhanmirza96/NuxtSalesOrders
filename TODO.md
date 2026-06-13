# TODO - Sales Invoices (Supabase)

## Step 1: Repo review (done)
- `createinvoice.vue` fields identify (invoice_number, customer_id, date, amount, items structure)
- `addsalesorder.vue` pattern identify (sales_order/sales_order_items naming)

## Step 2: Create Supabase tables
- Create `sales_invoice` (invoice header)
- Create `sales_invoice_items` (invoice lines)
- Add foreign keys to `customer`, `products`, `units_of_measure`
- Add indexes

## Step 3: Update `createinvoice.vue` (if needed)
- Implement insert into `sales_invoice`
- Implement insert into `sales_invoice_items`
- Implement auto invoice_number generation (like SO)

## Step 4: Test
- Create customer/products/units first
- Create sales order then convert to invoice (future flow)
- Validate totals + relationships

