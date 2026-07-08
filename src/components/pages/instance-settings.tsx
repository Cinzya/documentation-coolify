'use client';

import type { IconComponent } from 'reicon-react';
import {
  Calendar,
  Checklist2,
  CloudStorage,
  Database,
  Globe3,
  Mailbox,
  Refresh23,
  Rocket2,
  ServerCloud,
  Settings,
  Setting2,
  SignalStream,
  Warning22,
} from 'reicon-react';
import { Tab, Tabs } from '@/components/docs/tabs';
import { ZoomImage } from '@/components/docs/zoom-image';

type InstanceSettingsGroupKey =
  | 'configuration'
  | 'backup'
  | 'email'
  | 'oauth'
  | 'scheduled-jobs';

type InstanceSettingsOptionLink = {
  href: string;
  label: string;
};

type InstanceSettingsOption = {
  name: string;
  what: string;
  change: string;
  accepted: string[];
  notes?: string[];
  link?: InstanceSettingsOptionLink;
};

type InstanceSettingsPanel = {
  title: string;
  intro: string;
  options: InstanceSettingsOption[];
};

type InstanceSettingsGroup = {
  title: string;
  panels: InstanceSettingsPanel[];
};

const cronAliases =
  'every_minute, hourly, daily, weekly, monthly, yearly, or a valid cron expression.';

const instanceSettingsGroups = {
  configuration: {
    title: `Configuration`,
    panels: [
      {
        title: `General`,
        intro: `Use General for the basics of the Coolify instance: the dashboard URL people open, the instance label, the timezone for instance-level schedules, and the public IPs Coolify should use when auto-detection is wrong.`,
        options: [
          {
            name: `URL`,
            what: `This is the address you use to open the Coolify dashboard. Coolify also uses it when it needs to generate links back to the instance. If you want the dashboard to use HTTPS, the value must start with https://.`,
            change: `Enter the full dashboard URL in URL and click Save. Before changing it, make sure DNS for the domain points to the server where Coolify is running. If DNS validation is enabled, Coolify checks the domain and warns you when it is already used by another resource.`,
            accepted: [
              `A full URL with a protocol, for example https://coolify.shadowarcanist.com.`,
              `Use https:// when the dashboard should be served over HTTPS.`,
              `A root domain or subdomain.`,
            ],
            notes: [
              `Path-based URLs such as https://shadowarcanist.com/coolify are not supported.`,
              `Do not reuse an application or service domain for the dashboard. If the instance URL conflicts with a resource domain, SSL certificates and routing can become unpredictable.`,
            ],
          },
          {
            name: `Name`,
            what: `This is the human-readable label for the Coolify instance. It is useful when you manage more than one Coolify install and need to quickly recognize which dashboard you are using.`,
            change: `Update Name and click Save.`,
            accepted: [
              `Any text value up to 255 characters.`,
              `Leave it empty to keep the default Coolify instance name.`,
            ],
          },
          {
            name: `Instance Timezone`,
            what: `This timezone is used by instance-level schedules, including update checks and automatic updates. It does not change the timezone inside your applications or databases.`,
            change: `Search for the timezone in Instance Timezone, select it from the list, and save.`,
            accepted: [
              `A valid timezone identifier from the dashboard list, for example UTC, Europe/Berlin, or Asia/Colombo.`,
            ],
            notes: [
              `Database backup schedules can use the server timezone when the server has one configured. Otherwise, they fall back to the instance timezone.`,
            ],
          },
          {
            name: `Instance's Public IPv4`,
            what: `Coolify normally detects the public IPv4 address of the server that runs the instance. Use this field only when the detected address is wrong, usually on servers with multiple public IPs.`,
            change: `Enter the IPv4 address Coolify should use and click Save.`,
            accepted: [
              `Leave it empty to let Coolify use the detected address.`,
              `A valid IPv4 address, for example 203.0.113.10.`,
            ],
          },
          {
            name: `Instance's Public IPv6`,
            what: `Coolify normally detects the public IPv6 address of the server that runs the instance. Use this field only when Coolify picks the wrong IPv6 address or cannot detect it.`,
            change: `Enter the IPv6 address Coolify should use and click Save.`,
            accepted: [
              `Leave it empty to let Coolify use the detected address.`,
              `A valid IPv6 address, for example 2001:db8::1.`,
            ],
          },
        ],
      },
      {
        title: `Advanced`,
        intro: `Advanced contains instance-wide security, API, DNS, MCP, UI, and confirmation controls.`,
        options: [
          {
            name: `Registration Allowed`,
            what: `Controls whether users can create their own accounts from the registration page.`,
            change: `If registration is disabled, click Enable and complete the confirmation modal. If it is enabled, use the toggle and save.`,
            accepted: [
              `Enabled: anyone who can reach the registration page can create an account.`,
              `Disabled: only administrators can create accounts.`,
            ],
            notes: [
              `Keep this disabled unless you intentionally want public self-registration.`,
            ],
          },
          {
            name: `Do Not Track`,
            what: `Opts this instance out of anonymous installation counting and error reports sent to Coolify.`,
            change: `Toggle Do Not Track, then save.`,
            accepted: [
              `Enabled: do not send anonymous usage tracking or error reports.`,
              `Disabled: allow anonymous installation count and error reporting.`,
            ],
          },
          {
            name: `DNS Validation`,
            what: `Checks whether custom domains point to the right server before Coolify saves or deploys resources.`,
            change: `Toggle DNS Validation, then save.`,
            accepted: [
              `Enabled: validate DNS before deployment to reduce domain misconfiguration failures.`,
              `Disabled: skip DNS validation when saving domains.`,
            ],
          },
          {
            name: `Custom DNS Servers`,
            what: `Changes which DNS resolvers Coolify uses for domain validation.`,
            change: `Enter the resolver IPs in Custom DNS Servers, then save.`,
            accepted: [
              `Empty to use the system default DNS resolvers.`,
              `A comma-separated list of valid IPv4 or IPv6 addresses, for example 1.1.1.1,8.8.8.8.`,
            ],
          },
          {
            name: `API Access`,
            what: `Controls whether authenticated requests to the Coolify REST API are allowed.`,
            change: `Toggle API Access, then save. Create API tokens from Security > API Tokens.`,
            accepted: [
              `Enabled: authenticated API requests are accepted.`,
              `Disabled: API requests are blocked.`,
            ],
            link: {
              href: `/api-reference/authorization`,
              label: `API authorization`,
            },
          },
          {
            name: `Allowed IPs for API Access`,
            what: `Restricts which source IP addresses can call the Coolify API.`,
            change: `Enter one or more IPs or CIDR ranges, then save.`,
            accepted: [
              `Empty or 0.0.0.0 allows API access from anywhere.`,
              `Single IPv4 or IPv6 addresses, for example 192.168.1.100 or 2001:db8::10.`,
              `CIDR ranges, for example 10.0.0.0/8 or 203.0.113.0/24.`,
              `Use commas to separate multiple entries.`,
            ],
            notes: [
              `Allowing access from anywhere is not recommended for production instances.`,
            ],
          },
          {
            name: `Enable MCP Server`,
            what: `Exposes the instance MCP endpoint at /mcp for AI clients that authenticate with Coolify API tokens.`,
            change: `Enable API Access first, create a token in Security > API Tokens, then enable MCP Server.`,
            accepted: [
              `Enabled: https://coolify.shadowarcanist.com/mcp is available to authenticated MCP clients.`,
              `Disabled: the instance-wide MCP endpoint is unavailable.`,
            ],
            link: { href: `/integrations/mcp`, label: `MCP integration` },
          },
          {
            name: `SPA Navigation`,
            what: `Enables Livewire SPA-style navigation and prefetching for smoother dashboard page transitions.`,
            change: `Toggle SPA Navigation, then save.`,
            accepted: [
              `Enabled: dashboard links can prefetch and move between pages without full reloads.`,
              `Disabled: dashboard navigation uses full page loads.`,
            ],
            notes: [
              `Disable it if the dashboard has navigation issues after a browser or Livewire change.`,
            ],
          },
          {
            name: `Show Sponsorship Popup`,
            what: `Controls whether Coolify shows monthly sponsorship reminders.`,
            change: `Toggle Show Sponsorship Popup, then save.`,
            accepted: [
              `Enabled: monthly sponsorship reminders can be shown.`,
              `Disabled: sponsorship reminders are hidden permanently for the instance.`,
            ],
          },
          {
            name: `Disable Two Step Confirmation`,
            what: `Removes the extra text and password confirmation step from destructive or sensitive actions.`,
            change: `Click Disable, read the warning, then enter the confirmation text shown by Coolify.`,
            accepted: [
              `Enabled: destructive actions no longer require the extra confirmation step.`,
              `Disabled: destructive actions still require text and password confirmation.`,
            ],
            notes: [
              `Coolify marks this as dangerous because it increases the chance of accidental deletions or unwanted changes.`,
            ],
          },
        ],
      },
      {
        title: `Updates`,
        intro: `Updates controls version checks and automatic self-updates.`,
        options: [
          {
            name: `Update Check Frequency`,
            what: `Sets how often Coolify checks for new Coolify versions and pulls new service templates from the CDN.`,
            change: `Set Update Check Frequency, then click Save. Use Check Manually when you want to run the check immediately.`,
            accepted: [
              cronAliases,
              `The default is 0 * * * *, which checks every hour.`,
            ],
            link: {
              href: `/core/instance-management/update`,
              label: `Update Coolify`,
            },
          },
          {
            name: `Auto Update Enabled`,
            what: `Controls whether Coolify updates itself automatically.`,
            change: `Toggle Enabled under Auto Update. If AUTOUPDATE is set in /data/coolify/source/.env, the dashboard toggle is disabled and you must change the environment value instead.`,
            accepted: [
              `Enabled: Coolify can update itself on the configured schedule.`,
              `Disabled: Coolify only updates when you update it manually.`,
            ],
          },
          {
            name: `Auto Update Frequency`,
            what: `Sets the schedule Coolify uses when automatic updates are enabled.`,
            change: `Enable Auto Update, set Frequency, then click Save.`,
            accepted: [
              cronAliases,
              `The default is 0 0 * * *, which runs every day at 00:00.`,
            ],
          },
        ],
      },
    ],
  },
  backup: {
    title: `Backup`,
    panels: [
      {
        title: `Instance Database`,
        intro: `The Backup page is for the internal Coolify database. It does not back up every application volume or every external database.`,
        options: [
          {
            name: `Configure Backup`,
            what: `Creates the Coolify database resource and scheduled backup configuration needed for instance backups.`,
            change: `If Coolify shows Configure Backup, click it first. If the localhost server is not validated, validate the server before configuring backups.`,
            accepted: [
              `Available only when the localhost server is functional.`,
              `Creates or reveals the internal coolify-db backup configuration.`,
            ],
            link: {
              href: `/core/backup-and-recovery/instance-backup`,
              label: `Instance backup`,
            },
          },
          {
            name: `Description`,
            what: `Stores a short note for the internal Coolify database resource shown on the Backup page.`,
            change: `Update Description, then click Save.`,
            accepted: [
              `Any text value, or empty if you do not need a description.`,
            ],
          },
          {
            name: `UUID, Name, User, Password`,
            what: `Shows the internal database identity and credentials Coolify uses for its own database backup resource.`,
            change: `These fields are read-only on the Backup page. Change backup behavior from the Scheduled Backup section instead.`,
            accepted: [`Read-only values generated and managed by Coolify.`],
          },
        ],
      },
      {
        title: `Scheduled Backup`,
        intro: `Scheduled Backup controls when the internal Coolify database backup runs and how long backup files are kept.`,
        options: [
          {
            name: `Backup Enabled`,
            what: `Controls whether the scheduled backup job is active.`,
            change: `Toggle Backup Enabled in Scheduled Backup, then save.`,
            accepted: [
              `Enabled: the backup schedule can run.`,
              `Disabled: the backup schedule is kept but does not run.`,
            ],
          },
          {
            name: `Backup Now`,
            what: `Queues an immediate backup run without waiting for the next scheduled time.`,
            change: `Click Backup Now. Coolify shows this action when the database resource is running.`,
            accepted: [
              `A manual action; it does not change the saved schedule.`,
            ],
          },
          {
            name: `Frequency`,
            what: `Sets how often the instance database backup runs.`,
            change: `Update Frequency in Scheduled Backup, then save.`,
            accepted: [cronAliases, `For example, 0 0 * * * or daily.`],
          },
          {
            name: `Timezone`,
            what: `Shows the timezone used for the backup schedule.`,
            change: `This field is read-only on the backup schedule. Change the server timezone on the server settings page, or let Coolify use the instance timezone.`,
            accepted: [
              `The server timezone when configured.`,
              `The instance timezone when the server does not define one.`,
            ],
          },
          {
            name: `Timeout`,
            what: `Sets the maximum time a backup job can run before Coolify treats it as timed out.`,
            change: `Update Timeout in seconds, then save.`,
            accepted: [`Any integer from 60 to 36000 seconds.`],
          },
          {
            name: `Local Backup Retention`,
            what: `Controls how many local backup files Coolify keeps on the server.`,
            change: `Update the local retention limits, then save.`,
            accepted: [
              `Number of backups to keep: integer 0 or greater.`,
              `Days to keep backups: integer 0 or greater.`,
              `Maximum storage in GB: number 0 or greater; decimals are accepted.`,
              `A value of 0 means unlimited for that specific limit.`,
            ],
          },
        ],
      },
      {
        title: `S3 Storage`,
        intro: `S3 settings copy instance backup files to a validated S3-compatible storage target.`,
        options: [
          {
            name: `S3 Enabled`,
            what: `Controls whether backup files are uploaded to S3-compatible storage.`,
            change: `Toggle S3 Enabled, choose a storage target, then save.`,
            accepted: [
              `Enabled: upload backups to the selected S3 storage.`,
              `Disabled: keep backups local only unless Disable Local Backup was already reset.`,
            ],
            link: {
              href: `/core/backup-and-recovery/instance-backup`,
              label: `S3 backups`,
            },
          },
          {
            name: `S3 Storage`,
            what: `Selects the validated S3 storage record used for instance backup uploads.`,
            change: `Create and validate an S3 storage entry first, then select it from the S3 Storage field.`,
            accepted: [
              `One of the current team S3 storage entries marked usable by Coolify.`,
              `Unavailable when no validated S3 storage exists.`,
            ],
          },
          {
            name: `Disable Local Backup`,
            what: `Deletes the local backup file after Coolify uploads it to S3.`,
            change: `Enable S3 backups first, then toggle Disable Local Backup and save.`,
            accepted: [
              `Enabled: remove the local file after successful S3 upload.`,
              `Disabled: keep local backup files according to local retention rules.`,
            ],
          },
          {
            name: `S3 Storage Retention`,
            what: `Controls how many S3 backup files Coolify keeps in the selected S3 storage.`,
            change: `Enable S3, update the S3 retention limits, then save.`,
            accepted: [
              `Number of backups to keep: integer 0 or greater.`,
              `Days to keep backups: integer 0 or greater.`,
              `Maximum storage in GB: number 0 or greater; decimals are accepted.`,
              `A value of 0 means unlimited for that specific limit.`,
            ],
          },
        ],
      },
    ],
  },
  email: {
    title: `Transactional Email`,
    panels: [
      {
        title: `Sender`,
        intro: `Sender settings are shared by SMTP and Resend.`,
        options: [
          {
            name: `From Name`,
            what: `Sets the display name used in Coolify emails such as password resets and invitations.`,
            change: `Enter From Name, then save.`,
            accepted: [`A required text value, for example Coolify.`],
          },
          {
            name: `From Address`,
            what: `Sets the email address used as the sender for Coolify emails.`,
            change: `Enter From Address, then save.`,
            accepted: [
              `A required valid email address, for example noreply@shadowarcanist.com.`,
            ],
          },
          {
            name: `Send Test Email`,
            what: `Sends a test message using the currently enabled transactional email provider.`,
            change: `After SMTP or Resend is enabled and saved, click Send Test Email, enter a recipient, and send it.`,
            accepted: [`A valid recipient email address.`],
          },
        ],
      },
      {
        title: `SMTP Server`,
        intro: `SMTP Server connects Coolify to any SMTP-compatible email provider.`,
        options: [
          {
            name: `SMTP Enabled`,
            what: `Controls whether Coolify sends transactional email through SMTP.`,
            change: `Enable SMTP Server, complete the SMTP fields, then save.`,
            accepted: [
              `Enabled: SMTP is used and Resend is disabled.`,
              `Disabled: SMTP is not used.`,
            ],
          },
          {
            name: `Host`,
            what: `Sets the SMTP server hostname Coolify connects to.`,
            change: `Enter the provider host in the SMTP Server section, then save.`,
            accepted: [`A required hostname, for example smtp.mailgun.org.`],
          },
          {
            name: `Port`,
            what: `Sets the SMTP server port.`,
            change: `Enter the provider port in the SMTP Server section, then save.`,
            accepted: [
              `A required number from 1 to 65535, commonly 587, 465, or 25.`,
            ],
          },
          {
            name: `Encryption`,
            what: `Sets how Coolify secures the SMTP connection.`,
            change: `Choose Encryption in the SMTP Server section, then save.`,
            accepted: [`starttls`, `tls`, `none`],
          },
          {
            name: `SMTP Username`,
            what: `Sets the username Coolify uses to authenticate to the SMTP server.`,
            change: `Enter the username from your email provider in the SMTP Server section, then save.`,
            accepted: [
              `Any string, or empty when the SMTP provider does not require a username.`,
            ],
          },
          {
            name: `SMTP Password`,
            what: `Sets the password or token Coolify uses to authenticate to the SMTP server.`,
            change: `Enter the password from your email provider in the SMTP Server section, then save.`,
            accepted: [
              `Any string, or empty when the SMTP provider does not require a password.`,
            ],
          },
          {
            name: `Timeout`,
            what: `Sets how long Coolify waits when sending SMTP email.`,
            change: `Enter the timeout value in the SMTP Server section, then save.`,
            accepted: [
              `A numeric timeout value, or empty to use the provider/default mailer behavior.`,
            ],
          },
        ],
      },
      {
        title: `Resend`,
        intro: `Resend connects Coolify to Resend instead of SMTP.`,
        options: [
          {
            name: `Resend Enabled`,
            what: `Controls whether Coolify sends transactional email through Resend.`,
            change: `Enable Resend, enter the API key, then save.`,
            accepted: [
              `Enabled: Resend is used and SMTP is disabled.`,
              `Disabled: Resend is not used.`,
            ],
          },
          {
            name: `API Key`,
            what: `Stores the Resend API key used to send Coolify transactional email.`,
            change: `Create an API key in Resend, paste it into API Key, then save.`,
            accepted: [
              `A required Resend API key string when Resend is enabled.`,
            ],
          },
        ],
      },
    ],
  },
  oauth: {
    title: `OAuth`,
    panels: [
      {
        title: `Provider Settings`,
        intro: `Each provider card has its own enabled state, credentials, and redirect URI.`,
        options: [
          {
            name: `Provider`,
            what: `Selects which external identity provider users can use to sign in to Coolify.`,
            change: `Configure the provider card for the provider you want to enable.`,
            accepted: [
              `azure, bitbucket, clerk, discord, github, gitlab, google, authentik, infomaniak, or zitadel.`,
            ],
            link: { href: `/knowledge-base/oauth`, label: `OAuth setup` },
          },
          {
            name: `Enabled`,
            what: `Controls whether a specific OAuth provider can be used on the Coolify sign-in page.`,
            change: `Fill the required provider fields, then toggle Enabled for that provider.`,
            accepted: [
              `Enabled: the provider can be used if required fields are complete.`,
              `Disabled: the provider is hidden or unavailable for sign-in.`,
            ],
          },
          {
            name: `Client ID`,
            what: `Stores the OAuth application client ID from the identity provider.`,
            change: `Create an OAuth application with the provider, copy its client ID, paste it into Client ID, then save.`,
            accepted: [
              `Any provider-issued client ID string required by the provider.`,
            ],
          },
          {
            name: `Client Secret`,
            what: `Stores the OAuth application secret from the identity provider.`,
            change: `Copy the provider client secret, paste it into Client Secret, then save.`,
            accepted: [
              `Any provider-issued client secret string required by the provider.`,
            ],
          },
          {
            name: `Redirect URI`,
            what: `Defines the callback URL the identity provider redirects back to after authorization.`,
            change: `Copy the Redirect URI shown by Coolify into the OAuth application at the provider, then save the same value in Coolify if you override it.`,
            accepted: [
              `A full URL matching the provider callback, usually https://coolify.shadowarcanist.com/auth/<provider>/callback.`,
            ],
          },
        ],
      },
      {
        title: `Provider Fields`,
        intro: `Some providers need one extra field before Coolify can enable them.`,
        options: [
          {
            name: `Tenant`,
            what: `Stores tenant information for providers that support or require tenant scoping.`,
            change: `For Azure, enter the required tenant value. For Google, optionally enter a hosted domain to show a login hint.`,
            accepted: [
              `Azure: required tenant value.`,
              `Google: optional hosted domain value, for example shadowarcanist.com.`,
              `Other providers: leave empty unless the provider card shows the field.`,
            ],
          },
          {
            name: `Base URL`,
            what: `Stores the provider base URL for self-hosted or issuer-based OAuth providers.`,
            change: `Enter the provider base URL on provider cards that show Base URL, then save.`,
            accepted: [
              `Required by Authentik and Clerk before enabling the provider.`,
              `Shown for Authentik, Clerk, GitLab, and Zitadel provider cards.`,
              `Use a full URL from the provider, for example https://auth.shadowarcanist.com.`,
            ],
          },
        ],
      },
    ],
  },
  'scheduled-jobs': {
    title: `Scheduled Jobs`,
    panels: [
      {
        title: `Failures`,
        intro: `Failures shows scheduled backup, task, and cleanup executions that did not finish successfully.`,
        options: [
          {
            name: `Type Filter`,
            what: `Filters the failures list by the kind of scheduled work that failed.`,
            change: `Select a value from Type and review the filtered list.`,
            accepted: [`all, backup, task, or cleanup.`],
          },
          {
            name: `Time Range Filter`,
            what: `Filters failures by when they happened.`,
            change: `Select a value from Time Range and review the filtered list.`,
            accepted: [`last_24h, last_7d, last_30d, or all.`],
          },
          {
            name: `Failure Table`,
            what: `Shows the failed job type, resource, server, start time, duration, and error message.`,
            change: `Use Refresh to reload the page data after you fix a failed backup, task, or cleanup job.`,
            accepted: [
              `Read-only execution rows generated from failed scheduled work.`,
            ],
          },
        ],
      },
      {
        title: `Scheduler Runs`,
        intro: `Scheduler Runs shows when the ScheduledJobManager executed and whether it dispatched or skipped jobs.`,
        options: [
          {
            name: `Run History`,
            what: `Shows the scheduler event time, message, duration, dispatched count, and skipped count.`,
            change: `Switch to Scheduler Runs. Use Refresh to reload the newest run data.`,
            accepted: [`Read-only scheduler run rows generated by Coolify.`],
          },
          {
            name: `Gaps`,
            what: `Helps identify missed scheduler runs or lock conflicts when there are unexpected gaps between entries.`,
            change: `Compare the scheduler run times with the schedule you expected for backups, tasks, or cleanup jobs.`,
            accepted: [
              `Read-only timing evidence; large gaps usually need scheduler or worker investigation.`,
            ],
          },
        ],
      },
      {
        title: `Skipped Jobs`,
        intro: `Skipped Jobs shows scheduled work that Coolify intentionally did not dispatch because a condition was not met.`,
        options: [
          {
            name: `Skipped Jobs Table`,
            what: `Shows the skipped job time, type, resource, and reason.`,
            change: `Switch to Skipped Jobs. Use Refresh after fixing the reason.`,
            accepted: [
              `Read-only skip rows generated by scheduled job checks.`,
            ],
          },
          {
            name: `Skip Reasons`,
            what: `Explains why Coolify skipped a scheduled job before dispatching it.`,
            change: `Read the Reason column, fix the related server, subscription, resource, application, or service state, then refresh.`,
            accepted: [
              `server_not_functional, subscription_unpaid, database_deleted, server_deleted, resource_deleted, application_not_running, service_not_running, or another internal reason label.`,
            ],
          },
        ],
      },
    ],
  },
} satisfies Record<InstanceSettingsGroupKey, InstanceSettingsGroup>;

const panelIcons: Record<string, IconComponent> = {
  General: Settings,
  Advanced: Setting2,
  Updates: Refresh23,
  'Instance Database': Database,
  'Scheduled Backup': Calendar,
  'S3 Storage': CloudStorage,
  Sender: Mailbox,
  'SMTP Server': ServerCloud,
  Resend: Rocket2,
  'Provider Settings': Globe3,
  'Provider Fields': Checklist2,
  Failures: Warning22,
  'Scheduler Runs': SignalStream,
  'Skipped Jobs': Checklist2,
};

function AcceptedValues({ values }: { values: string[] }) {
  return (
    <div className="mt-4 text-sm leading-6 text-fd-muted-foreground">
      <p className="m-0 font-medium text-fd-foreground">Accepted values:</p>
      <ul className="m-0 mt-1 list-disc space-y-1.5 pl-5">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

function OptionNotes({ notes }: { notes: string[] }) {
  return (
    <div className="mt-4 text-sm leading-6 text-fd-muted-foreground">
      <p className="m-0 font-medium text-fd-foreground">Notes:</p>
      <ul className="m-0 mt-1 list-disc space-y-1.5 pl-5">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

function OptionScreenshot({ title }: { title: string }) {
  return (
    <div data-option-screenshot className="mt-3">
      <ZoomImage src="shadow-to-do" alt={`${title} setting screenshot`} />
    </div>
  );
}

function OptionDetails({ option }: { option: InstanceSettingsOption }) {
  return (
    <article className="py-6 last:pb-0">
      <h4 className="m-0 text-lg font-semibold text-fd-foreground">
        {option.name}
      </h4>
      <OptionScreenshot title={option.name} />
      <p className="m-0 mt-3 text-sm leading-7 text-fd-muted-foreground">
        {option.what}
      </p>
      <p className="m-0 mt-3 text-sm leading-7 text-fd-muted-foreground">
        {option.change}
      </p>
      <AcceptedValues values={option.accepted} />
      {option.notes?.length ? <OptionNotes notes={option.notes} /> : null}
      {option.link ? (
        <p className="m-0 mt-4 text-sm leading-7 text-fd-muted-foreground">
          For the detailed guide, follow{' '}
          <a
            href={option.link.href}
            className="font-semibold text-fd-primary underline decoration-fd-primary/50 underline-offset-4 hover:decoration-fd-primary"
          >
            {option.link.label}
          </a>
          .
        </p>
      ) : null}
    </article>
  );
}

function SettingsPanel({ panel }: { panel: InstanceSettingsPanel }) {
  return (
    <div className="not-prose">
      <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
        {panel.intro}
      </p>
      <div className="mt-5 divide-y divide-fd-border border-y border-fd-border">
        {panel.options.map((option) => (
          <OptionDetails key={option.name} option={option} />
        ))}
      </div>
    </div>
  );
}

export function InstanceSettingsOptions({
  group,
}: {
  group: InstanceSettingsGroupKey;
}) {
  const settingsGroup = instanceSettingsGroups[group];

  return (
    <div data-instance-settings-options={group} className="not-prose my-6">
      <Tabs
        id={`instance-settings-${group}`}
        items={settingsGroup.panels.map((panel) => panel.title)}
      >
        {settingsGroup.panels.map((panel) => (
          <Tab
            key={panel.title}
            value={panel.title}
            icon={panelIcons[panel.title] ?? Setting2}
          >
            <SettingsPanel panel={panel} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
