/**
 * NOTE: This file is required to make `@walletconnect/web3-provider` package work
 * inside of Vite. The package has dependencies that assume that node builtins are
 * available, which they are not in Vite. Ideally long term this package should
 * migrate off of usage of these modules, but for now this seems to work.
 */
import process from 'process';
import { Buffer } from 'buffer';

globalThis.global = globalThis;
globalThis.process = process;
globalThis.Buffer = Buffer;
