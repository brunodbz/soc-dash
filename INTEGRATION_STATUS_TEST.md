# Integration Status Display - Quick Test Guide

## Quick Verification Steps

Follow these steps to verify the integration status fix is working correctly.

---

## Test 1: Disable Integration (2 minutes)

### Steps:

1. **Open Dashboard**
   - Navigate to http://localhost:5173
   - Look at the integration widgets on the right side

2. **Check Initial State**
   - All 4 integrations should show "Connected" (blue badge)
   - All should have green checkmark icons
   - All should show "Active" indicator at bottom

3. **Go to Admin Panel**
   - Click "Admin" in top navigation
   - Click "Integrations" tab (should be default)

4. **Disable Elasticsearch**
   - Find "Elastic Search SIEM" card
   - Click the toggle switch to turn it OFF
   - **Expected:** Success toast: "Integration disabled successfully"

5. **Return to Dashboard**
   - Click "Dashboard" in top navigation
   - Look at Elasticsearch integration widget

6. **Verify Changes** ✅
   - **Expected:** Badge shows "Disabled" (gray, not blue)
   - **Expected:** Icon is gray X (not green checkmark)
   - **Expected:** No "Active" indicator at bottom
   - **Expected:** Other 3 integrations still show "Connected"

---

## Test 2: Re-enable Integration (1 minute)

### Steps:

1. **Go to Admin Panel**
   - Click "Admin" in top navigation

2. **Enable Elasticsearch**
   - Find "Elastic Search SIEM" card
   - Click the toggle switch to turn it ON
   - **Expected:** Success toast: "Integration enabled successfully"

3. **Return to Dashboard**
   - Click "Dashboard" in top navigation

4. **Verify Changes** ✅
   - **Expected:** Badge shows "Connected" (blue)
   - **Expected:** Icon is green checkmark
   - **Expected:** "Active" indicator visible at bottom

---

## Test 3: Multiple Integrations (2 minutes)

### Steps:

1. **Disable Multiple Integrations**
   - Go to Admin Panel → Integrations
   - Disable Elasticsearch (toggle OFF)
   - Disable Tenable (toggle OFF)
   - Keep Defender and OpenCTI enabled

2. **Check Dashboard**
   - Go to Dashboard
   - **Expected Results:**

   | Integration | Status Badge | Icon | Active Indicator |
   |-------------|--------------|------|------------------|
   | Elasticsearch | Disabled (gray) | Gray X | No |
   | Tenable | Disabled (gray) | Gray X | No |
   | Defender | Connected (blue) | Green ✓ | Yes |
   | OpenCTI | Connected (blue) | Green ✓ | Yes |

3. **Re-enable All**
   - Go to Admin Panel
   - Enable Elasticsearch
   - Enable Tenable
   - All 4 should now show "Connected" on Dashboard

---

## Visual Reference

### What You Should See

#### Enabled Integration (Connected)
```
┌─────────────────────────────┐
│ 🗄️  Elastic Search SIEM  ✓ │ ← Green checkmark
├─────────────────────────────┤
│ Status:        [Connected]  │ ← Blue badge
│ Events:             1,247   │
│ Last Sync:          5m ago  │
│ ● Active                    │ ← Green pulsing dot
└─────────────────────────────┘
```

#### Disabled Integration
```
┌─────────────────────────────┐
│ 🗄️  Elastic Search SIEM  ✗ │ ← Gray X
├─────────────────────────────┤
│ Status:         [Disabled]  │ ← Gray badge
│ Events:             1,247   │
│ Last Sync:          5m ago  │
│                             │ ← No active indicator
└─────────────────────────────┘
```

---

## Common Issues

### Issue: Status Still Shows "Connected" After Disabling

**Possible Causes:**
1. Browser cache - Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Page not refreshed - Navigate away and back to Dashboard
3. Toggle didn't save - Check for error toast

**Solution:**
- Hard refresh the page
- Check browser console for errors (F12)
- Try toggling again

### Issue: Changes Don't Persist After Page Refresh

**Expected Behavior:**
- This is normal with mock data
- Changes persist during current session
- Page refresh reloads from mock data source
- In production with real backend, changes would persist

---

## Browser Console Check

### No Errors Expected

1. Open browser console (F12)
2. Go to Console tab
3. Perform the tests above
4. **Expected:** No red error messages
5. **Expected:** No warnings about React hooks

### What You Might See (Normal)
```
[Vite] connected
[Vite] hot updated: ...
```

### What You Should NOT See (Errors)
```
❌ Uncaught TypeError: Cannot read properties of null
❌ Warning: Invalid hook call
❌ Error: Integration not found
```

---

## Quick Checklist

Use this checklist to verify all functionality:

### Dashboard Display
- [ ] Enabled integrations show "Connected" (blue badge)
- [ ] Disabled integrations show "Disabled" (gray badge)
- [ ] Enabled integrations have green checkmark icon
- [ ] Disabled integrations have gray X icon
- [ ] Enabled integrations show "Active" indicator
- [ ] Disabled integrations don't show "Active" indicator

### Admin Panel
- [ ] Toggle switch reflects integration state
- [ ] Toggling OFF shows success toast
- [ ] Toggling ON shows success toast
- [ ] Integration card still shows all details when disabled
- [ ] "Save Configuration" button still works when disabled

### State Consistency
- [ ] Dashboard reflects Admin Panel changes
- [ ] Multiple integrations can be disabled independently
- [ ] Re-enabling works correctly
- [ ] No console errors during any operation

---

## Performance Check

### Expected Response Times

| Action | Expected Time |
|--------|---------------|
| Toggle integration | < 1 second |
| Navigate to Dashboard | < 1 second |
| Status update visible | Immediate |
| Success toast appears | Immediate |

### If Slow
- Check network tab in browser dev tools
- Look for failed API calls
- Check for console errors

---

## Success Criteria

✅ **Test Passes If:**
1. Disabled integrations show "Disabled" badge on Dashboard
2. Enabled integrations show "Connected" badge on Dashboard
3. Icon changes from checkmark to X when disabled
4. "Active" indicator disappears when disabled
5. Changes are visible immediately after navigation
6. No console errors
7. Success toasts appear for all operations

❌ **Test Fails If:**
1. Disabled integration still shows "Connected"
2. Icon doesn't change when disabled
3. Console shows errors
4. Toast messages don't appear
5. Changes not visible on Dashboard

---

## Reporting Issues

If tests fail, please provide:

1. **Browser Information**
   - Browser name and version
   - Operating system

2. **Steps to Reproduce**
   - Exact steps you followed
   - Which integration you tested

3. **Expected vs Actual**
   - What you expected to see
   - What you actually saw

4. **Console Errors**
   - Any errors in browser console (F12)
   - Screenshots if possible

5. **Network Tab**
   - Any failed API calls
   - Response status codes

---

## Additional Tests (Optional)

### Test 4: Rapid Toggle
1. Toggle an integration ON and OFF rapidly (5 times)
2. **Expected:** All toggles work, no errors
3. **Expected:** Final state matches toggle position

### Test 5: All Disabled
1. Disable all 4 integrations
2. **Expected:** Dashboard shows all 4 as "Disabled"
3. **Expected:** No "Active" indicators visible
4. **Expected:** Stats still display correctly

### Test 6: Browser Refresh
1. Disable an integration
2. Refresh page (F5)
3. **Expected:** Integration state persists (with mock data, may reset)
4. **Expected:** No console errors after refresh

---

**Test Guide Version**: 1.2.4  
**Last Updated**: December 1, 2025  
**Estimated Test Time**: 5-10 minutes  
**Status**: Ready for Testing
