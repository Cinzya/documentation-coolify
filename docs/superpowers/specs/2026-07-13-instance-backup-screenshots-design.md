# Instance backup screenshot design

## Goal

Replace the broad, outdated image in **Configure recurring backups** with focused screenshots that show readers the current controls they must use.

## Scope

This change affects only the **Configure recurring backups** section of `content/docs/core/backup-and-recovery/instance-backup.mdx` and its new image assets. The existing **Backup Now** and **Executions** screenshots remain unchanged.

## Source of truth

Capture the screenshots from a current Coolify instance that matches the checked source UI in `resources/views/livewire/project/database/backup-edit.blade.php`.

The images must show the current labels and states:

- **Backup Enabled**
- **S3 Enabled**
- **Disable Local Backup**
- **S3 Storage**
- **Frequency**
- **Timezone**
- **Timeout**
- **Local Backup Retention**
- **S3 Storage Retention**

Do not substitute a hand-built illustration when the current UI cannot be captured. Report the missing capture environment instead.

## Screenshot set

### 1. Schedule

Show **Backup Enabled**, **Frequency**, **Timezone**, **Timeout**, and the relevant **Save** control. Crop out unrelated instance database fields and navigation when they do not help locate these settings.

Place the image immediately after the schedule instructions.

### 2. Local retention

Show the complete **Local Backup Retention** group with:

- **Number of backups to keep**
- **Days to keep backups**
- **Maximum storage (GB)**

Place the image immediately after the local-retention explanation.

### 3. S3 backup settings

Capture the enabled S3 state and show **S3 Enabled**, the selected **S3 Storage**, **Disable Local Backup**, and the complete **S3 Storage Retention** group. Use a non-sensitive test storage name.

Place the image immediately after the S3 instructions.

## Capture requirements

- Use a current Coolify build and dark theme to match nearby documentation images.
- Use only dummy or non-sensitive values; do not expose real UUIDs, passwords, storage credentials, domains, or account names.
- Keep labels and controls legible at the normal documentation content width.
- Crop each image to the smallest area that answers the corresponding instruction.
- Do not add arrows, numbered badges, chat bubbles, or decorative annotations.
- Save the three assets as WebP files under `public/images/core/backup-and-recovery/instance-backup/`.
- Use descriptive alternative text that names the controls shown.

## MDX changes

- Remove the old `1.webp` overview image from **Configure recurring backups**.
- Add the schedule screenshot inside the first step.
- Add the local-retention screenshot inside the second step.
- Add the S3 screenshot inside the third step.
- Keep all screenshot ownership and placement in MDX using `ZoomableImage`.

## Verification

- Confirm each image loads and appears beside the matching instructions.
- Confirm the labels shown in each image match the current Coolify source.
- Confirm the images remain legible on desktop and can be opened with `ZoomableImage` on mobile.
- Switch between the dashboard and terminal tabs to ensure the existing page interaction still works.
- Run the docs wording review and `git diff --check`.
