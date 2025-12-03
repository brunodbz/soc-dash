# Admin Panel Testing Guide

## Quick Test Instructions

Follow these steps to verify the admin panel fixes are working correctly.

---

## Test 1: Integration Configuration Saving

### Steps:

1. **Open the Dashboard**
   - Navigate to http://localhost:5173 (or your deployment URL)

2. **Go to Admin Panel**
   - Click "Admin" in the top navigation

3. **Select Integrations Tab**
   - Should be selected by default
   - You'll see 4 integration cards

4. **Test Elasticsearch Configuration**
   - Locate the "Elastic Search SIEM" card
   - Change the URL field (e.g., add `/test` to the end)
   - Change the username (e.g., change to `elastic-admin`)
   - Click "Save Configuration" button
   - **Expected Result**: 
     - ✅ Green success toast appears: "Integration settings saved successfully"
     - ✅ Changes remain visible in the form

5. **Verify Persistence**
   - Refresh the page (F5 or Ctrl+R)
   - Go back to Admin Panel → Integrations
   - **Expected Result**: 
     - ✅ Your changes are still there (URL and username you entered)

6. **Test Other Integrations**
   - Repeat steps 4-5 for:
     - Tenable Vulnerability Scanner
     - Microsoft Defender
     - OpenCTI Threat Intelligence
   - **Expected Result**: 
     - ✅ All integrations save and persist correctly

---

## Test 2: Integration Toggle

### Steps:

1. **Toggle Integration Off**
   - In Admin Panel → Integrations tab
   - Find any integration card
   - Click the toggle switch to turn it OFF
   - **Expected Result**: 
     - ✅ Success toast: "Integration disabled successfully"
     - ✅ Toggle switch shows OFF state

2. **Toggle Integration On**
   - Click the same toggle switch to turn it ON
   - **Expected Result**: 
     - ✅ Success toast: "Integration enabled successfully"
     - ✅ Toggle switch shows ON state

3. **Verify Persistence**
   - Refresh the page
   - **Expected Result**: 
     - ✅ Toggle state persists

---

## Test 3: User Editing

### Steps:

1. **Go to Users Tab**
   - In Admin Panel, click "Users" tab
   - You'll see 3 users: admin, analyst1, manager1

2. **Open Edit Dialog**
   - Click "Edit" button on the first user (admin)
   - **Expected Result**: 
     - ✅ Dialog opens with title "Edit User"
     - ✅ Username field shows "admin"
     - ✅ Email field shows "admin@soc.example.com"
     - ✅ Role dropdown shows "Admin"

3. **Test Username Edit**
   - Change username to "admin-test"
   - Click "Save Changes"
   - **Expected Result**: 
     - ✅ Dialog closes
     - ✅ Success toast: "User updated successfully"
     - ✅ User list shows "admin-test" instead of "admin"

4. **Test Email Edit**
   - Click "Edit" on the same user
   - Change email to "admin-test@soc.example.com"
   - Click "Save Changes"
   - **Expected Result**: 
     - ✅ Dialog closes
     - ✅ Success toast appears
     - ✅ User list shows new email

5. **Test Role Change**
   - Click "Edit" on analyst1
   - Change role from "Analyst" to "Manager"
   - **Expected Result**: 
     - ✅ Role description text updates below dropdown
     - ✅ Shows: "Read-only access to dashboard and reports"
   - Click "Save Changes"
   - **Expected Result**: 
     - ✅ Dialog closes
     - ✅ Success toast appears
     - ✅ Badge changes from "ANALYST" to "MANAGER"

6. **Test Cancel**
   - Click "Edit" on any user
   - Make some changes
   - Click "Cancel" button
   - **Expected Result**: 
     - ✅ Dialog closes
     - ✅ No success toast
     - ✅ Changes are NOT applied to user list

7. **Test Multiple Users**
   - Edit all 3 users with different changes
   - **Expected Result**: 
     - ✅ All changes save correctly
     - ✅ Each user shows updated information

---

## Test 4: Error Handling

### Steps:

1. **Test with Empty Fields** (if validation added)
   - Open user edit dialog
   - Clear the username field
   - Try to save
   - **Expected Result**: 
     - ✅ Validation prevents save OR
     - ✅ Error toast appears

---

## Visual Verification Checklist

### Integration Configuration Card
- [ ] Card has integration name and icon
- [ ] Toggle switch is visible and functional
- [ ] Form fields are clearly labeled
- [ ] "Save Configuration" button is visible
- [ ] Status badge shows "connected" or "disconnected"
- [ ] Events count is displayed
- [ ] Last sync timestamp is shown

### User Edit Dialog
- [ ] Dialog has proper title "Edit User"
- [ ] Dialog has description text
- [ ] Username field is visible and editable
- [ ] Email field is visible and editable
- [ ] Role dropdown is visible and functional
- [ ] Role description text updates when role changes
- [ ] "Cancel" button is visible
- [ ] "Save Changes" button is visible
- [ ] Dialog closes when clicking outside (optional)

### Toast Notifications
- [ ] Success toasts are green/positive
- [ ] Error toasts are red/negative (if errors occur)
- [ ] Toasts auto-dismiss after a few seconds
- [ ] Toast messages are clear and descriptive

---

## Expected Behavior Summary

### ✅ What Should Work

1. **Integration Configuration**
   - Saving configuration updates the data
   - Changes persist after page refresh
   - Success toast appears on save
   - Toggle switch enables/disables integrations

2. **User Management**
   - Edit button opens dialog with user data
   - Username can be changed
   - Email can be changed
   - Role can be changed
   - Changes save and update UI
   - Cancel button discards changes

3. **User Feedback**
   - Success toasts for successful operations
   - Error toasts for failed operations (if any)
   - Loading states during async operations

---

## Troubleshooting

### Issue: Changes Don't Persist
**Solution**: 
- This is expected with mock data in a development environment
- Changes persist during the current session
- Refreshing the page reloads from the mock data source
- In production with a real backend, changes would persist permanently

### Issue: Dialog Doesn't Open
**Solution**:
- Check browser console for errors (F12 → Console)
- Ensure JavaScript is enabled
- Try refreshing the page

### Issue: Toast Doesn't Appear
**Solution**:
- Toast may appear briefly and auto-dismiss
- Check if toast container is visible on screen
- Try the action again and watch carefully

---

## Browser Testing

Test in multiple browsers to ensure compatibility:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Mobile Testing (Optional)

Test responsive behavior on mobile:

1. Open browser dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device
4. Test all functionality

**Expected Result**:
- ✅ Admin panel is usable on mobile
- ✅ Dialogs are properly sized
- ✅ Forms are easy to fill out
- ✅ Buttons are easily tappable

---

## Performance Testing

### Load Time
- [ ] Admin panel loads within 2 seconds
- [ ] Integration cards render quickly
- [ ] User list renders quickly

### Interaction Speed
- [ ] Dialog opens instantly
- [ ] Form inputs are responsive
- [ ] Save operations complete within 1 second
- [ ] Toasts appear immediately

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab key navigates through form fields
- [ ] Enter key submits forms
- [ ] Escape key closes dialogs
- [ ] All interactive elements are keyboard accessible

### Screen Reader (Optional)
- [ ] Form labels are announced
- [ ] Button purposes are clear
- [ ] Dialog title is announced
- [ ] Success/error messages are announced

---

## Test Results Template

Copy and fill out after testing:

```
## Test Results

**Date**: [Date]
**Tester**: [Your Name]
**Browser**: [Browser Name and Version]
**Environment**: [Local/Staging/Production]

### Integration Configuration
- [ ] Elasticsearch save: PASS / FAIL
- [ ] Tenable save: PASS / FAIL
- [ ] Defender save: PASS / FAIL
- [ ] OpenCTI save: PASS / FAIL
- [ ] Toggle functionality: PASS / FAIL
- [ ] Persistence: PASS / FAIL

### User Management
- [ ] Edit dialog opens: PASS / FAIL
- [ ] Username edit: PASS / FAIL
- [ ] Email edit: PASS / FAIL
- [ ] Role change: PASS / FAIL
- [ ] Cancel button: PASS / FAIL
- [ ] Multiple edits: PASS / FAIL

### User Experience
- [ ] Success toasts: PASS / FAIL
- [ ] Error handling: PASS / FAIL
- [ ] Loading states: PASS / FAIL
- [ ] Responsive design: PASS / FAIL

### Issues Found
[List any issues or bugs discovered]

### Notes
[Any additional observations]
```

---

**Testing Guide Version**: 1.2.2  
**Last Updated**: December 1, 2025  
**Status**: Ready for Testing
