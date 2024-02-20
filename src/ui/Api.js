export default class Api {
  static async deal() {
    const resp = await fetch("/api/v1/deal");
    const card = await resp.json();
    return card;
  }

  static async getId(){
      const resp = await fetch("/api/v2/deck/new", { method: "POST" });
      const response = await resp.json();
      return response;    
  }

  static async dealV2(id, count) {
      // while testing things out, you can override response to be whatever you want
      const resp = await fetch(`/api/v2/deck/${id}/deal?count=${count}`, { method: "POST" });
      const response = await resp.json();
      return response;
  }

}