# `ethical-react`

### A Note on State

Currently, the state is managed via Jotai. This is really considered to be an internal implementation detail of the library, and should probably not be depended on. None of the Jotai internals are exposed, and internals may change in the future.

Jotai is used to manage state as it has built-in suspense support, and managing state in a suspense-friendly way in user-space can be a little bit challenging. In the future, Jotai will likely be replaced with a built-in Suspense cache (outlined here https://github.com/reactwg/react-18/discussions/25).
