# Obliviate Session Recovery Tutorial Design

## Goal

Publish a practical ContextMCP-style blog article that explains how Obliviate lets Claude Code and OpenCode users recover a useful agent session after accidentally sending a request intended for another agent working on a separate task.

## Audience

Developers who use Claude Code or OpenCode with multiple agent tasks and need a safe way to remove or redo incorrect session turns without discarding useful conversation context.

## Page

Create `contextmcp/blog-obliviate-session-recovery.html` as a standalone static HTML page. It will follow the presentation established by the existing ContextMCP articles:

- Sticky navigation with the ContextMCP Dockerized logo treatment.
- Blue-violet gradient hero with title, publication metadata, and an article summary.
- 800px single-column article layout with responsive mobile behavior.
- Blue and purple callouts, dark code blocks, and a gradient CTA.
- Existing Google Analytics include and the established footer link style.

## Article Flow

1. Introduce the cross-task failure scenario: while working on Task A, a user sends a request meant for the agent handling Task B. The accidental request remains in the session history even after correction.
2. Explain why a conversational correction does not remove the misleading historical context.
3. Describe Obliviate as a session-history editing workflow that works on a fork rather than the live session.
4. Provide separate installation instructions for Claude Code and OpenCode using the commands from the Obliviate repository.
5. Walk through recovery: identify the accidental turn, fork the session, review the affected turns, remove or redo the wrong request, validate the result, and continue in corrected context.
6. Summarize safety guarantees: the live session is never written, confirmation is required before deletion, structural references are validated, and mutations are backed up.
7. End with a GitHub CTA for `J3ys/Obliviate`.

## Content Requirements

- Write for both Claude Code and OpenCode without treating either as secondary.
- Keep the example focused on an accidental request sent to the wrong agent, not a destructive repository request.
- Use only verified commands and claims from the repository README.
- Present installation commands in copyable code blocks.
- Link to the Obliviate GitHub repository and to Sendel.org in the footer.

## Validation

- Verify the new HTML is structurally valid and has no broken relative asset paths.
- Check the document at desktop and mobile widths.
- Confirm all required content appears: both installation paths, the cross-task scenario, guided recovery steps, safety guarantees, and CTA.
