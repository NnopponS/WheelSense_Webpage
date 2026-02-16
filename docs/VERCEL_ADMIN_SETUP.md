# Vercel Admin Mode Setup

## 1) Environment Variables
Set these in your Vercel project settings:
- `ADMIN_MODE_TOKEN`: optional override token used to authenticate admin edits.
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL.
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token.

If `ADMIN_MODE_TOKEN` is not set, the API accepts this default token:
- `TheWheelsWillHaveNoSenseWithoutWheelSense`

## 2) Deploy
Deploy the project to Vercel as usual.

## 3) Open Admin CMS
Open:
- `https://<your-domain>/admin.html`

Enter `ADMIN_MODE_TOKEN` in the login form.

## 4) Edit Content
In Admin CMS:
- Select page (`Home`, `Story`, `Projects`, `Team`, `Awards`, `Contact`).
- Edit field values from the left panel.
- For `Team` and `Awards`, use JSON editor fields to add/remove items, images, and detailed sections.
- Review live preview on the right panel.
- Click `Save Changes` to publish content overrides.
- Click `Reset Page` to remove saved overrides for that page.

## 5) Notes
- Public pages read saved overrides from `/api/content`.
- If Redis variables are missing, API uses in-memory fallback (not persistent on Vercel functions).
- Token verification uses `/api/content?verify=1` and must pass before entering admin mode.
