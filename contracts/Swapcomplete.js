syntax = "proto3";

message SwapRequest {
  // Random unique identifier for the current message
  string id = 1;
  // The proposer's quantity
  uint64 amount_p = 2;
  // The proposer's asset hash
  string asset_p = 3;
  // The responder's quantity
  uint64 amount_r = 4;
  // The responder's asset hash
  string asset_r = 5;
  // The proposer's unsigned transaction in PSET format (base64 string)
  string transaction = 6;
  // In case of a confidential transaction the blinding key of each confidential
  // input is included. Each blinding key is identified by the prevout script
  // hex encoded.
  map<string, bytes> input_blinding_key = 7;
  // In case of a confidential transaction the blinding key of each confidential
  // output is included. Each blinding key is identified by the output script
  // hex encoded.
  map<string, bytes> output_blinding_key = 8;
}

message SwapAccept {
  // Random unique identifier for the current message
  string id = 1;
  // indetifier of the SwapRequest message
  string request_id = 2;
  // The partial signed transaction base64 encoded containing the Responder's
  // signed inputs in a PSET format
  string transaction = 3;
  // In case of a confidential transaction the blinding key of each confidential
  // input is included. Each blinding key is identified by the prevout script
  // hex encoded.
  map<string, bytes> input_blinding_key = 4;
  // In case of a confidential transaction the blinding key of each confidential
  // output is included. Each blinding key is identified by the output script
  // hex encoded.
  map<string, bytes> output_blinding_key = 5;
}

message SwapComplete {
  // Random unique identifier for the current message
  string id = 1;
  // indetifier of the SwapAccept message
  string accept_id = 2;
  // The signed transaction base64 encoded containing the Proposers's signed
  // inputs in a PSET format
  string transaction = 3;
}

message SwapFail {
  // Random unique identifier for the current message
  string id = 1;
  // indetifier of either SwapRequest or SwapAccept message. It can be empty
  string message_id = 2;
  // The failure code. It can be empty
  uint32 failure_code = 3;
  // The failure reason messaged
  string failure_message = 4;
}
